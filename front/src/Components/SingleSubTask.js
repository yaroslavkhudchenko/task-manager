import React from 'react';

const SingleSubTask = ({ title, descr, setOpenDescr}) => {
    
    return(
        <div id="singleSubTaskModal">
            <div id='singleSubTaskModalContent'>
                <div id="singleSubTaskModalTitle">
                    <textarea defaultValue={title} onBlur={
                        console.log('blueer1')
                    } />
                </div>
                <div id="singleSubTaskModalBody">
                    <label>Description</label>
                    <textarea defaultValue={descr} onBlur={
                        console.log('blueer2')
                    } />
                </div>
                <div
                    id="singleSubTaskModalClose"
                    onClick={() => setOpenDescr(false)}
                >
                    close
                </div>
            </div>
        </div>
    )
}
export default SingleSubTask;
