import React from 'react'

const Title = ({title1,title2,titleStyles,paraStyles,para}) => {
  return (
    <div className={titleStyles}>
        <h3 className={`${titleStyles} h3 capitalize`}>{title1}
           <span className='font-light underline'> {title2} </span>
        </h3>
        <p className={`${paraStyles} max-w-md mt-2`}>{para ? para:"Discover books that spark curiosity, deliver quality,a nd bring inspiratin to your everyday reading."}</p>
    </div>
  )
}

export default Title