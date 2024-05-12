import LottieView from 'lottie-react-native';

import { View, Text } from 'react-native'
import React, { useRef } from 'react'

const AnimationLottie = ({setAppReady}) => {
  const animation = useRef(null);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <LottieView
        autoPlay
        onAnimationFinish={setTimeout(()=>{
          setAppReady(true)
        }, 1000)
      }
        ref={animation}
        style={{
          width: "100%",
          height: 500,
          backgroundColor: '#FFF',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/lottie/rentaly.json')}
      />
      <Text className="text-[40px] font-[700]">Rentaly</Text>
    </View>
  )
}

export default AnimationLottie