import * as vscode from 'vscode';
import {
  BaseLanguageClient,
  ClientCapabilities,
  DynamicFeature,
  ExecuteCommandParams,
  ExecuteCommandRequest,
  FeatureState,
  LanguageClient,
  LanguageClientOptions,
  RequestType,
  ServerOptions,
  StaticFeature,
  TextDocumentIdentifier,
  TextDocumentPositionParams,
  WorkDoneProgress,
  WorkDoneProgressCreateRequest,
} from 'vscode-languageclient/node';
import { ExtensionState, StatusIcon } from './view';

export enum BuildStatus {
  /**
   * The build process terminated without any errors.
   */
  Success = 0,

  /**
   * The build process terminated with errors.
   */
  Error = 1,

  /**
   * The build process failed to start or crashed.
   */
  Failure = 2,

  /**
   * The build process was cancelled.
   */
  Cancelled = 3,
}

export interface BuildResult {
  /**
   * The status of the build process.
   */
  status: BuildStatus;
}

export enum ForwardSearchStatus {
  /**
   * The previewer process executed the command without any errors.
   */
  Success = 0,

  /**
   * The previewer process executed the command with errors.
   */
  Error = 1,

  /**
   * The previewer process failed to start or crashed.
   */
  Failure = 2,

  /**
   * The previewer command is not configured.
   */
  Unconfigured = 3,
}

export interface ForwardSearchResult {
  /**
   * The status of the previewer process.
   */
  status: ForwardSearchStatus;
}

abstract class BuildTextDocumentRequest {
  public static type = new RequestType<
    TextDocumentPositionParams,
    BuildResult,
    void
  >('textDocument/build');
}

abstract class ForwardSearchRequest {
  public static type = new RequestType<
    TextDocumentPositionParams,
    ForwardSearchResult,
    void
  >('textDocument/forwardSearch');
}

export class CustomProgressFeature implements StaticFeature {
  public fillClientCapabilities(capabilities: ClientCapabilities): void {
    if (!capabilities.window) {
      capabilities.window = {};
    }
    capabilities.window.workDoneProgress = true;
  }

  constructor(
    private readonly client: BaseLanguageClient,
    private readonly icon: StatusIcon,
  ) {}

  public getState(): FeatureState {
    return { kind: 'static' };
  }

  public dispose(): void {
    // nothing to dispose here
  }

  public initialize(): void {
    this.client.onRequest(WorkDoneProgressCreateRequest.type, ({ token }) => {
      this.icon.update(ExtensionState.Building);
      this.client.onProgress(WorkDoneProgress.type, token, (progress) => {
        if (progress.kind === 'end') {
          this.icon.update(ExtensionState.Running);
        }
      });
    });
  }
}

export class LatexLanguageClient extends LanguageClient {
  constructor(
    name: string,
    serverOptions: ServerOptions,
    clientOptions: LanguageClientOptions,
    icon: StatusIcon,
  ) {
    super(name, serverOptions, clientOptions);
    this.registerProposedFeatures();
    this.registerFeature(new CustomProgressFeature(this, icon));
  }

  public registerFeature(
    feature: StaticFeature | DynamicFeature<unknown>,
  ): void {
    if (feature.constructor.name !== 'ProgressFeature') {
      super.registerFeature(feature);
    }
  }

  public async cancelBuild(): Promise<void> {
    return await this.sendRequest(ExecuteCommandRequest.type, {
      command: 'texlab.cancelBuild',
      arguments: [],
    });
  }

  public async cleanAuxiliary(document: vscode.TextDocument): Promise<void> {
    return await this.sendRequest(ExecuteCommandRequest.type, {
      command: 'texlab.cleanAuxiliary',
      arguments: [
        this.code2ProtocolConverter.asTextDocumentIdentifier(document),
      ],
    });
  }

  public async cleanArtifacts(document: vscode.TextDocument): Promise<void> {
    return await this.sendRequest(ExecuteCommandRequest.type, {
      command: 'texlab.cleanArtifacts',
      arguments: [
        this.code2ProtocolConverter.asTextDocumentIdentifier(document),
      ],
    });
  }

  public async changeEnvironment(
    document: vscode.TextDocument,
    position: vscode.Position,
    newName: string,
  ): Promise<void> {
    return await this.sendRequest(ExecuteCommandRequest.type, {
      command: 'texlab.changeEnvironment',
      arguments: [
        {
          textDocument:
            this.code2ProtocolConverter.asTextDocumentIdentifier(document),
          position,
          newName,
        },
      ],
    });
  }

  public async dependencyGraph(): Promise<string> {
    return await this.sendRequest(ExecuteCommandRequest.type, {
      command: 'texlab.showDependencyGraph',
    });
  }

  public async build(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<BuildResult> {
    const params = this.code2ProtocolConverter.asTextDocumentPositionParams(
      document,
      position,
    );

    return await this.sendRequest(BuildTextDocumentRequest.type, params);
  }

  public async forwardSearch(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<ForwardSearchResult> {
    const params = this.code2ProtocolConverter.asTextDocumentPositionParams(
      document,
      position,
    );

    return this.sendRequest(ForwardSearchRequest.type, params);
  }
}
