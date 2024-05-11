import React from 'react'
import {useState} from "react";
import axios from "axios";


export const NewProduct= () => {
    const [files, setfiles] = useState(null);
    const [progress, setProgress] = useState({started: false, pc: 0});
    const [msg, setMsg] = useState(null)

    function handleUpload() {
        if (!files) {
            setMsg("no file selected");
            return;
        }
        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append(`file${i + 1}`, files[i]);
        }
        setMsg("uploading ...")
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        axios.post('http://httpbin.org/post', fd, {
            onUploadProgress: (progressEvent) => {
                setProgress(prevState => {
                    return {...prevState, pc: progressEvent.progress * 100}
                })
            }, headers: {"custom-header": "value",}
        })
            .then(res => {
                setMsg("upload secessful")
                console.log(res.data);
            })

            .catch(err => {
                setMsg("upload failed")
                console.error(err)
            });
    }


    return(
    <div>
        {/* BEGIN CONTENT */}
        {/*// <!-- BEGIN CONTENT -->*/}
        <div className="col-md-9 col-sm-7">
            <h1>Standart forms</h1>
            <div className="content-form-page">
                <form role="form" className="form-horizontal form-without-legend">
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="first-name">First Name <span
                            className="require">*</span></label>
                        <div className="col-lg-8">
                            <input type="text" id="first-name" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="last-name">Last Name <span
                            className="require">*</span></label>
                        <div className="col-lg-8">
                            <input type="text" id="first-name" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="email">E-Mail <span
                            className="require">*</span></label>
                        <div className="col-lg-8">
                            <input type="text" id="email" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="telephone">Telephone <span
                            className="require">*</span></label>
                        <div className="col-lg-8">
                            <input type="text" id="telephone" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="fax">Fax</label>
                        <div className="col-lg-8">
                            <input type="text" id="fax" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Dropdown</label>
                        <div className="col-md-8">
                            <select className="form-control">
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                                <option>Option 4</option>
                                <option>Option 5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Dropdown</label>
                        <div className="col-md-8">
                            <select className="form-control">
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                                <option>Option 4</option>
                                <option>Option 5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label">File input</label>
                        <div className="col-lg-8">


                            {/*//ADD photo // */}
                            <input onChange={(e) => {
                                setfiles(e.target.files)
                            }} type="file" multiple/>
                            <button onClick={handleUpload}> Upload</button>
                            {progress.started && <progress max="100" value={progress.pc}></progress>}
                            {msg && <span>{msg}</span>}
                            {/*// End ADD photo // */}


                            <p className="help-block">some help text here.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label" for="message">Message</label>
                        <div className="col-lg-8">
                            <textarea className="form-control" rows="6"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-offset-2 padding-left-0 padding-top-20">
                            <button className="btn btn-primary" type="submit">Continue</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {/*// <!-- END CONTENT -->*/}
        {/* END CONTENT */}

    </div>
)
}