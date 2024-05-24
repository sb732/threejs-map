import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import * as d3 from 'd3';

const Box = ({ position }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.01, 0.01, 0.01]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
};

const Map = ({ data }) => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            {data.map((point, index) => (
                <Box key={index} position={[point.x, point.y, point.z]} />
            ))}
        </Canvas>
    );
};

const ThreeDMap = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        d3.csv('/coordinates.csv').then(data => {
            const parsedData = data.map(d => ({
                x: +d.x / 6000,
                y: +d.y / 4000,
                z: +d.z
            }));
            setData(parsedData);
        }).catch(error => {
            console.error('Error loading or parsing CSV file:', error);
        });
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            {data.length > 0 ? <Map data={data} /> : <p>Loading...</p>}
        </div>
    );
};

export default ThreeDMap;
