/* add "userAgentData" to window.navigator */
interface Navigator {
  userAgentData?: {
    platform: string
  }
}
