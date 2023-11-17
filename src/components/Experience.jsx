import {
  ContactShadows,
  Cylinder,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { useGameStore } from "../store";
import { CharacterController } from "./CharacterController";
import { KanaSpots } from "./KanaSpots";
import { Kicker } from "./Kicker";
import { Torii } from "./Torii";
import { Stage } from "./Stage";
export const Experience = () => {
  const {currentKana, lastWrongKana}= useGameStore((state) => ({
    currentKana: state.currentKana,
    lastWrongKana: state.lastWrongKana,  
  }));

  return (
    <>
      <OrbitControls />
      {/* LIGHTS */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        color={"#9e69da"}
      />

      {/* BACKGROUND */}

      <RigidBody colliders={false} type="fixed" name="void">
        <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#dbecfb"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>
      <ContactShadows 
      frames={1}
      position={[0, -0.88, 0]}
      Scale={80}
      opacity={0.42}
      far={50}
      blur={0.8}
      color={"#aa9acd"}
      />

      {currentKana && (
        <Text position={[0, -0.92, 0]} 
        fontSize={1.84} 
        rotation-x={-Math.PI / 2} 
        font="./fonts/Poppins-ExtraBold.ttf">
          {currentKana.name.toUpperCase()}
          <meshStandardMaterial color={"white"} opacity={0.6} transparent />
        </Text>
      )}
      
      {lastWrongKana && (
        <Text position={[0, -0.92, 1.2]} 
        fontSize={1} 
        rotation-x={-Math.PI / 2} 
        font="./fonts/Poppins-ExtraBold.ttf">
          {lastWrongKana.name.toUpperCase()}
          <meshStandardMaterial color={"red"} opacity={0.6} transparent />
        </Text>
      )}

      <group position-y={-1}>
        <Kicker />
        {/* STAGE */}
        <Stage position-y={-0.98} />
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider args={[1 / 2, 5]} />
        </RigidBody>

        {/* CHARACTER */}
        <CharacterController />

        {/* KANA */}
        <KanaSpots />
      </group>
    </>
  );
};
