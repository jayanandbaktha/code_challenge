import React from 'react';

const Pagestatus = ({ imglength, index }) => {
  return (
    <div className="pagestatus" >      
        <p>{index+1} of {imglength}</p>     
    </div>
  );
}

export default Pagestatus;
