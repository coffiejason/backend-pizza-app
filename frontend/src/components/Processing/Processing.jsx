import React from 'react'

const Processing = ({ orderNum }) => {

  if (orderNum) {

    return (
      <>
      <div>We are baking your pizza, please wait</div>
      <iframe src="https://giphy.com/embed/tUXkcqA4Pt0UPJRpTa" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Teka-Group-maestro-teka-maestropizza-tUXkcqA4Pt0UPJRpTa">via GIPHY</a></p>
    </>
    )

  }
  else{
    return(
      <>
      </>
    )
  }

}

export default Processing