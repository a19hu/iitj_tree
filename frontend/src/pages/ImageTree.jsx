import { ForceGraph3D } from 'react-force-graph';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import axios from 'axios';
import defaultimage from '../image/download.jpeg'
import logo from '../image/logo.png'
import { image } from 'd3';

const ImageTree = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alltree/`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchData();
  }, []);

  const nodes = [{
    id: 'All',
    user: 'IITJ',
    description: 'IITJ',
    img:logo
  }];
const links = [];
var image;
if(data[0]){

  console.log('data', data[0].picture.replace('open', 'thumbnail'))
 image = data[0].picture.replace('open', 'thumbnail')
}
const processNode = (node, parentId) => {
   const nodeData = {
     id: node.rollNo,
    user: node.name,
     description: node.rollNo,
     img: node.picture ? "https://picsur.org/i/c4ed4a18-b261-426d-a7d1-586d1a451c0b.png" : defaultimage
  };
  nodes.push(nodeData);
    if (node.parentId) {
    links.push({ source: node.parentId, target: node.rollNo });
  }
  else{
      links.push({ source: 'All', target: node.rollNo });

  }
    node.children.forEach(child => {
    processNode(child);
  });
}
data.forEach(element => {
  if(element.parentId){
    const nodeData = {
      id: element.rollNo,
      user: element.name,
      description: element.rollNo,
      img: element.picture ? image : defaultimage
    };
    nodes.push(nodeData);
    links.push({ source: 'All', target: element.rollNo });
  }
  else{

    processNode(element)
  }
});
const graphdata=
  {
    nodes: nodes,
    links: links
  }
// console.log(graphdata)
  return (
    <div >
      {/* <div style={{padding:100}}>hii</div> */}
      {/* <div>{nodes[1]}</div> */}
      {/* <img src={nodes[1] && nodes[1].img} alt="" /> */}
      {/* <img src={nodes[2] && nodes[2].img} alt="" /> */}
      {/* <img src={image} alt="" /> */}



        <ForceGraph3D
        backgroundColor={'#1b2735'}
        nodeColor={() => 'red'} 
        linkColor={'#1b2735'}
        width={window.innerWidth}
        height={window.innerHeight}
        linkCurvature={1}
        linkCurveRotation={2}
        linkWidth={0.5}
       graphData={graphdata}
       nodeLabel={node => `${node.user}: ${node.description}`}
       nodeAutoColorBy="user"
       linkDirectionalParticles={1}
       nodeThreeObject={({ img }) => {
         const imgTexture = new THREE.TextureLoader().load(img);
         imgTexture.colorSpace = THREE.SRGBColorSpace;
         const material = new THREE.SpriteMaterial({ 
           
           map: imgTexture ,
           color: 0xffffff,
       });
         const sprite = new THREE.Sprite(material);
         sprite.scale.set(12, 12);

         return sprite;
       }}
     />

      </div>

  );
};

export default ImageTree;
