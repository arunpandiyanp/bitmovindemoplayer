

import React, { useCallback, useEffect, useState } from 'react';
import {
  Platform,StyleSheet,View,
} from 'react-native';


import {
  SourceType,
  PlayerView,
  Player,
  usePlayer,
} from 'bitmovin-player-react-native';






function VideoView() {
 






 // The `usePlayer` hook creates or references a certain native `Player`
  // instance from within any component.
  const player = usePlayer ({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Setting up a license key` for more information.
    licenseKey: 'YOUR KEY',
    
    playbackConfig: {
       // Specifies whether the playback starts immediately after loading a source or not. Default is false.
       isAutoplayEnabled: true,
       
       
       // Specifies if playback starts muted. Default is false.
    },
    
  });

  useEffect(() => {
    // Load a streamable video source during component's initialization.
    player.load({
      // Select url and type dependeding on the running platform.
      url:
        Platform.OS === 'ios'
          ? // HLS for iOS
          //DRM content sample video 
          //https://fps.ezdrm.com/demo/video/ezdrm.m3u8

          'ENCRYTPED DRM M3U8 URL'
          : // Dash for Android
            'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
      // Optionally set a title that will appear at player's top-left corner.
      title: 'videoTitle',
      // Optionally load a poster image over the player.
      poster: 'videoPosterURL',
      // Optionally set whether poster image will persist over player.
      // Useful for audio-only streams. Default to false.
       // Each key in this object maps to a different DRM system config (`widevine` or `fairplay`).
       drmConfig: {
    
        // FairPlay is the default and only DRM system supported on iOS for now.
        fairplay: {
          licenseUrl: 'license Url',
          certificateUrl: 'certificate Url',
       licenseRequestHeaders: { 
        'Connection': 'keep-alive',
        'Content-type': 'application/octet-stream',
       'preauthorization': 'DRM TOken Needed', 
      },
   
      
    
       prepareLicense: (license) => {
            console.log(
              '\n[PREPARE LICENSE]\nlicense:',
              license.slice(0, 256) + '...\n'
            );
            // Do something with license...
            return license;
          },
          prepareCertificate: (certificate) => {
            console.log(
              '\n[PREPARE CERTIFICATE]\ncertificate:',
              certificate.slice(0, 256) + '...\n'
            );
            // Do something with certificate...
            return certificate;
          },
          prepareMessage: (message, assetId) => {
            console.log(
              '\n[PREPARE MESSAGE]\nassetId:',
              assetId,
              '\nmessage:',
              message.slice(0, 256) + '...\n'
            );
            // Do something with message...
            return message;
          },
          prepareSyncMessage: (syncMessage, assetId) => {
            console.log(
              '[PREPARE SYNC MESSAGE]\nassetId:',
              assetId,
              '\nsyncMessage:',
              syncMessage.slice(0, 256) + '...\n'
            );
            // Do something with syncMessage and assetId...
            return syncMessage;
          },
          prepareContentId: (contentId) => {
            console.log('\n[PREPARE CONTENT ID]\ncontentId:', contentId + '\n');
            // const { ContentId, KeyId } = extractHlsHeaderData(contentId);
            return contentId;
          },
          prepareLicenseServerUrl: (licenseServerUrl) => {
            console.log(
              '[PREPARE LICENSE SERVER URL]\nlicenseServerUrl:',
              licenseServerUrl + '\n'
            );
            // Do something with licenseServerUrl...
            return licenseServerUrl;
          },
        },
      },
    });
  }, [player]);
  const extractHlsHeaderData = (contentId:string) => {
    console.log('contentId',contentId);
    const base64decoded = window.atob(
        initDataAsString.split('skd://')[1].split('?')[0]);
    return JSON.parse(base64decoded);
};

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onGOReady = useCallback(() => {
      // Start playback
      player.play();
      // Print event timestamp
    },
    [player]
  );
  const onEvent = useCallback((event: Event) => {
  }, []);
  
  const onSourceError = useCallback((error: Error) => {
    console.log(error);
  }, []);

  const onPlayerError = useCallback((error: Error) => {
    console.log(error);
  }, []);

 
  // Make sure to pass the `player` prop in `PlayerView`.
  return (
    <View style={styles.flex1}>
     <PlayerView style={styles.flex1} player={player} 
      onPlay={onEvent}
        onPlaying={onEvent}
        onPaused={onEvent}
        onReady={onGOReady}
        onSourceLoaded={onEvent}
        onSeek={onEvent}
        onSeeked={onEvent}
        onSourceError={onSourceError}
        onPlayerError={onPlayerError}
        />
    </View>
  );
  
}


const styles = StyleSheet.create({
  flex1: {
    height:'100%',
    width:'100%',
  },
});
export default VideoView;






