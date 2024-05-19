

import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const VideoCall = () => {
    let { teamId } = useParams();
    
    console.log('Room ID:', teamId);

    
  const roomID = teamId;
  console.log('Received teamId:', teamId); // Debugging log
  console.log('Assigned roomID:', roomID);
  let myMeeting = async (element) => {
    // Generate Kit Token
    const appID = 1428909108;
    const serverSecret = "36475aaa53e1fefe3687f9e3d1f318e6";
    const userID = randomID(5);
    const userName = randomID(5);

    console.log(`Generating token with appID: ${appID}, serverSecret: ${serverSecret}, roomID: ${roomID}, userID: ${userID}, userName: ${userName}`);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    console.log(`Generated kitToken: ${kitToken}`);

    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    if (zp) {
      console.log('ZegoUIKitPrebuilt instance created successfully');

      // Start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    } else {
      console.error('Failed to create ZegoUIKitPrebuilt instance');
    }
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default  VideoCall;