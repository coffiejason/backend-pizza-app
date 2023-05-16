import React from 'react'
import Lottie from 'react-lottie-player'

import animation from './pizza-animation.json'

const Processing = ({ orderNum }) => {

  if (orderNum) {

    return (
      <>
        <div>We are baking your pizza, please wait</div>
        {/* GIPHY */}
        {/* <iframe src="https://giphy.com/embed/tUXkcqA4Pt0UPJRpTa" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Teka-Group-maestro-teka-maestropizza-tUXkcqA4Pt0UPJRpTa">via GIPHY</a></p> */}

        <Lottie
          loop
          animationData={animation}
          play
          style={{ width: 300, height: 300 }}
        />
      </>
    )

  }
  else {
    return (
      <>
      </>
    )
  }

}

export default Processing