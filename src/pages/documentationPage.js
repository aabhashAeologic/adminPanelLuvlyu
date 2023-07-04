import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getDocsData } from 'src/redux/features/documentationSlice';

export default function Doceditor() {
    const aboutUsEditor = useRef(null);
    const privacyPolicyEditor = useRef(null);
    const termsCondtionEditor = useRef(null);
    const deleteAccountEditor = useRef(null);




    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getDocsData());
    },[])

    const getDocumentationData=useSelector((state)=>state.docsReducer);
    let initalAboutUsData="Inital data";
    let initalPrivacyData="Initail Privacy Data";
    let initalTermsCondtionData="Initail Terms & Condtion Data";
    let initalDeletePolicyData="Initial Delete Policy Data";

    if(getDocumentationData.loading===false){
        if(getDocumentationData.docs.length!=0){
            initalAboutUsData=getDocumentationData.docs.message.aboutus;
            initalPrivacyData=getDocumentationData.docs.message.privacy
            initalTermsCondtionData=getDocumentationData.docs.message.termsConditions
            initalDeletePolicyData=getDocumentationData.docs.message.deleteAccountPolicy

        }
    }


    console.log("documentation data is");
    console.log(getDocumentationData)

    const handelAboutUs = () => {
        if (aboutUsEditor.current) {
            console.log(aboutUsEditor.current.getContent());
            let payload={
                aboutus:aboutUsEditor.current.getContent()
            }
            dispatch(getDocsData(payload))
        }
    };
    
    const handelPrivacyPolicy = () => {
        if (privacyPolicyEditor.current) {
            console.log(privacyPolicyEditor.current.getContent());
            let payload={
                privacy:privacyPolicyEditor.current.getContent()
            }
            dispatch(getDocsData(payload))
        }
    };

    const handelTermsCondtions = () => {
        if (privacyPolicyEditor.current) {
            console.log(termsCondtionEditor.current.getContent());
            let payload={
                termsConditions:termsCondtionEditor.current.getContent()
            }
            dispatch(getDocsData(payload))
        }
    };

    const handelDeleteAccountPolicy = () => {
        if (deleteAccountEditor.current) {
            console.log(deleteAccountEditor.current.getContent());
            let payload={
                deleteAccountPolicy:deleteAccountEditor.current.getContent()
            }
            dispatch(getDocsData(payload))
        }
    };
  
    return (
        <>  
        <h1>Documentation Editors</h1>
        
            <h4>About Us Editor</h4>
            <Editor
            // here the api key of the client will come
                apiKey='your-api-key'
                onInit={(evt, editor) => aboutUsEditor.current = editor}
                initialValue={initalAboutUsData}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                
            />
            <br />
            <Button onClick={handelAboutUs} variant='outlined' color='info'>Save Edit</Button>
            <br />
            <h4>Privacy & Policy Editor</h4>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => privacyPolicyEditor.current = editor}
                initialValue={initalPrivacyData}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <br />
            <Button onClick={handelPrivacyPolicy}variant='outlined' color='info'>Save Edit</Button>

           
            <br />
            <h4>Terms & conditons  Editor</h4>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => termsCondtionEditor.current = editor}
                initialValue={initalTermsCondtionData}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <br />
            <Button onClick={handelTermsCondtions}variant='outlined' color='info'>Save Edit</Button>


            <br />
            <h4>Delete Account Policy Editor</h4>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => deleteAccountEditor.current = editor}
                initialValue={initalDeletePolicyData}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <br />
            <Button onClick={handelDeleteAccountPolicy}variant='outlined' color='info'>Save Edit</Button>
        </>
    );
}
