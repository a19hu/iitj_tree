import { ForceGraph3D } from 'react-force-graph';
import React,{useEffect,useState} from 'react';
import * as THREE from 'three';
import defaultimage from '../image/download.jpeg'
import logo from '../image/logo.png'

const ImageTree = ({ data }) => {
//    const [load,setload]=useState(true)
//   useEffect(()=>{
//  setTimeout(
//     ()=>{
//     setload(false)
//     },600)
//   },[])

  if (!data) return <p>Loading</p>;
 
    

  const nodes = [{
    id: 'All',
    user: 'IITJ',
    description: 'IITJ',
    img: logo
  }];
  const links = [];
  var image;
  if (data[0]) {

    image = data[0].picture.replace('open', 'thumbnail')
  }

  const processNode = (node, parentId) => {
    const nodeData = {
      id: node.rollNo,
      user: node.name,
      description: node.rollNo,
      img: node.picture ? node.picture : defaultimage
    };
    nodes.push(nodeData);
    if (node.parentId) {
      links.push({ source: node.parentId, target: node.rollNo });
    }
    else {
      links.push({ source: 'All', target: node.rollNo });

    }
    node.children.forEach(child => {
      processNode(child);
    });
  }
  data.forEach(element => {
    if (element.parentId) {
      const nodeData = {
        id: element.rollNo,
        user: element.name,
        description: element.rollNo,
        img: element.picture ? element.picture : defaultimage
      };
      nodes.push(nodeData);
      links.push({ source: 'All', target: element.rollNo });
    }
    else {

      processNode(element)
    }
  });
  const graphdata =
  {
    nodes: nodes,
    links: links
  }

  return (
    <div className='imagetree' >
      <ForceGraph3D
        backgroundColor={'#BCE4EF'}
        // nodeColor={() => 'black'} 
        linkColor={'black'}
        width={window.innerWidth}
        height={window.innerHeight}
        linkCurvature={1}
        linkCurveRotation={2}
        linkWidth={2}
        graphData={graphdata}
        nodeLabel={node => `${node.user}: ${node.description}`}
        nodeAutoColorBy="user"
        linkDirectionalParticles={2}
        nodeThreeObject={({ img }) => {
          const imgTexture = new THREE.TextureLoader().load(img);
          imgTexture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({
            map: imgTexture,
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
