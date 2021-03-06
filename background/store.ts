export const NoFrameId = Build.MinCVer < BrowserVer.MinWithFrameId && Build.BTypes & BrowserType.Chrome
    && CurCVer_ < BrowserVer.MinWithFrameId

export let cKey: kKeyCode = kKeyCode.None
export let cNeedConfirm: BOOL = 1
let cOptions: CommandsNS.Options = null as never
export let cPort: Frames.Port = null as never
/** any change to `cRepeat` should ensure it won't be `0` */
export let cRepeat = 1
export let needIcon = false

export let reqH_: BackendHandlersNS.FgRequestHandlers
export let executeCommand: (registryEntry: CommandsNS.Item, count: number, lastKey: kKeyCode, port: Port
    , overriddenCount: number) => void

export const set_cKey = (_newKey: kKeyCode): void => { cKey = _newKey }
export const set_cNeedConfirm = (_newNeedC: BOOL): void => { cNeedConfirm = _newNeedC }
export const get_cOptions = <K extends keyof BgCmdOptions = kBgCmd.blank, Trust extends boolean = false> (
    ): (Trust extends true ? KnownOptions<K> : UnknownOptions<K>) & SafeObject => cOptions as any
export const set_cOptions = <T> (_newOpts: CommandsNS.Options & T | null): void => { cOptions = _newOpts! }
export const set_cPort = (_newPort: Frames.Port | null): void => { cPort = _newPort! }
export const set_cRepeat = (_newRepeat: number): void => { cRepeat = _newRepeat }
export const set_needIcon = (_newNeedIcon: boolean): void => { needIcon = _newNeedIcon }

export const set_reqH_ = (_newRH: BackendHandlersNS.FgRequestHandlers): void => { reqH_ = _newRH }
export const set_executeCommand = (_newEC: typeof executeCommand): void => { executeCommand = _newEC }

let _secret = 0, _time = 0

export const getSecret = (): number => {
  const now = Date.now() // safe for time changes
  if (now - _time > GlobalConsts.VomnibarSecretTimeout) {
    _secret = 1 + (0 | (Math.random() * 0x6fffffff)) + (now & 0xfff)
  }
  _time = now
  return _secret
}

Settings_.updateHooks_.showActionIcon = (value): void => { needIcon = value && !!chrome.browserAction }
