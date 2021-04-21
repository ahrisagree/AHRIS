import React from 'react';

const MainTitle = ({title, ...rest}) => {
  return (
    <div {...rest}>
      <h4 style={{
        color:"black", 
        fontSize: "1.5rem", 
        fontWeight:600, 
        textAlign:"left"
        }}
      >{title}</h4>
      <div style={{
        width:414, 
        height: 12, 
        backgroundColor:"#FFB800", 
        borderRadius: 4
        }}
      />
    </div>
  )
}

export default MainTitle