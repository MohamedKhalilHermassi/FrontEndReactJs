import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import React from 'react';
const FacialLogin = () => {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [faceExpression, setFaceExpression] = React.useState('');
    const [capturedImage, setCapturedImage] = React.useState(null);
    const [capturedImage2, setCapturedImage2] = React.useState('images/President_Kais_Saïed_cropped.jpg');
    const [numFacesDetected , setNumFacesDetected] = React.useState(0);
    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();
  
    React.useEffect(() => {
      const loadModels = async () => {
        try {
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/model/tiny_face_detector_model-weights_manifest.json'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/model/face_landmark_68_model-weights_manifest.json'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/model/face_recognition_model-weights_manifest.json'),
            faceapi.nets.faceExpressionNet.loadFromUri('/model/face_expression_model-weights_manifest.json'),
          ]);
          setModelsLoaded(true);
        } catch (error) {
          console.error('Error loading models:', error);
        }
      };
  
      loadModels();
    }, []);
  
    const startVideo = () => {
      setCaptureVideo(true);
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    }
  
    const handleVideoOnPlay = () => {
      setInterval(async () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
          const displaySize = {
            width: videoWidth,
            height: videoHeight
          }
  
          faceapi.matchDimensions(canvasRef.current, displaySize);
  
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        
        }
      }, 100)
    }
    const chechkphotos = async () => {
      if (capturedImage && capturedImage2) {
        // Charger les modèles de détection faciale
        await faceapi.nets.tinyFaceDetector.loadFromUri('/model/tiny_face_detector_model-weights_manifest.json');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/model/face_landmark_68_model-weights_manifest.json');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/model/face_recognition_model-weights_manifest.json');
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/model/ssd_mobilenetv1_model-weights_manifest.json');

        // Créer des éléments image pour charger les images
        const image1 = document.createElement('img');
        const image2 = document.createElement('img');
    
        // Charger les images
        image1.src = capturedImage;
        image2.src = capturedImage2;
    
        // Attendre que les images soient chargées
        await Promise.all([
          image1.decode(),
          image2.decode()
        ]);
    
        // Détecter les visages dans les deux images
        const detection1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor();
        const detection2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor();
    
        // Vérifier si les visages ont été détectés dans les deux images
        if (detection1 && detection2) {
          // Calculer la distance entre les descripteurs de visage
          const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
    
          // Afficher la distance dans la console
          console.log('Distance between faces:', distance);
    
          // Définir un seuil de similarité
          const threshold = 0.6;
    
          // Comparer la distance avec le seuil
          if (distance < threshold) {
            console.log('Les visages sont similaires');
          } else {
            console.log('Les visages ne sont pas similaires');
          }
        } else {
          console.log('Au moins un des visages n\'a pas été détecté dans l\'une des images');
        }
      } else {
        console.log('Les images n\'ont pas été capturées');
      }
    }
    const takeSnapshot = async () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL();
        setCapturedImage(imageUrl);
        // Analyser l'image capturée
        const detection = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        if (detection) {
          setNumFacesDetected(detection.length)
          const expression = detection[0].expressions.asSortedArray()[0].expression;
          setFaceExpression(expression);
        } else {
          setFaceExpression('No face detected');
        }
      }
    const closeWebcam = () => {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
      setCapturedImage(null);
    }
  
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          {
            captureVideo && modelsLoaded ?
              <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                Close Webcam
              </button>
              :
              <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                Open Webcam
              </button>
              
          }
          {captureVideo && (
            <button onClick={takeSnapshot} style={{ cursor: 'pointer', backgroundColor: 'blue', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px', marginLeft: '10px' }}>
              Take Snapshot
            </button>
            
          )}
        </div>
        {captureVideo ? (
          modelsLoaded ? (
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                  <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                  <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={capturedImage2} alt="captured" style={{ width: '300px', height: 'auto', borderRadius: '10px', marginTop: '10px' }} />
                <button onClick={chechkphotos} style={{ cursor: 'pointer', backgroundColor: 'blue', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px', marginLeft: '10px' }}>
              Check
            </button></div>
              {capturedImage && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={capturedImage} alt="captured" style={{ width: '300px', height: 'auto', borderRadius: '10px', marginTop: '10px' }} />
                <p style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px' }}>
                  Face Expression: {faceExpression}
                </p>
                <p style={{ textAlign: 'center', fontSize: '20px' }}>
                Number of Faces Detected: {numFacesDetected}
              </p>
                </div>
              )}
            </div>
          ) : (
            <div>loading...</div>
          )
        ) : (
          <>
            {/* Vous pouvez ajouter d'autres éléments à afficher si la webcam n'est pas activée */}
          </>
        )}
      </div>
    );
  }
  
  export default FacialLogin;