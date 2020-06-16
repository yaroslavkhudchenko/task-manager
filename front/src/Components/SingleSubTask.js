import React from 'react';

const SingleSubTask = ({ title, descr, setOpenDescr}) => {
    
    return(
        <div id="singleSubTaskModal">
            <div id="singleSubTaskModalTitle">{title}</div>
            <div id="singleSubTaskModalBody">{descr}</div>
            <div
                id="singleSubTaskModalClose"
                onClick={() => setOpenDescr(false)}
            >
                close
                    </div>
        </div>
    )
}
export default SingleSubTask;
