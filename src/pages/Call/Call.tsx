import { ZIM } from 'zego-zim-web'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useSearchParams } from 'react-router-dom'

function randomID(len: number) {
  let result = ''
  if (result) return result
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1]
  return new URLSearchParams(urlStr)
}

const Call = () => {
  const [params] = useSearchParams()
  console.log(Object.fromEntries(params))
  const roomID = getUrlParams().get('roomID') || randomID(5)

  const myMeeting = async (element: HTMLElement | null | undefined) => {
    // generate Kit Token
    const appID = 1900811219
    const serverSecret = '216a534b932715241b26bbe6ca87de3a'
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      'UvCfp1Gr9iSWKk8RUgTrqAsJMr92',
      'Trần Trung Thịnh'
    )

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.addPlugins({ ZIM })
    // start the call
    // zp.joinRoom({
    //   container: element,
    //   sharedLinks: [
    //     {
    //       name: 'Personal link',
    //       url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID
    //     }
    //   ],
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.OneONoneCall // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
    //   }
    // })
    const targetUser = {
      userID: 'UvCfp1Gr9iSWKk8RUgTrqAsJMr92',
      userName: 'user_Trần Trung Thịnh'
    }
    zp.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 10 // Timeout duration (second). 60s by default, range from [1-600s].
    })
      .then((res) => {
        console.warn(res)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return <div className='myCallContainer' ref={myMeeting} style={{ width: '100vw', height: '100vh' }}></div>
}

export default Call
