<!--
  File: src/lib/components/ModelViewer.svelte
  A component that displays and handles the 3D KitchenAid mixer model
-->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { browser } from '$app/environment';
	import { selectedColor } from '$lib/stores/colorStore';

	/** @type {{ 
    modelPath?: string
  }} */
	let { modelPath = '/models/KitchenAid_100yrs/KitchenAid_100yrs.glb' } = $props();

	// Define TypeScript variables with proper types
	let container: HTMLElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let mixer: THREE.AnimationMixer;
	let model: THREE.Group;
	let controls: OrbitControls;
	let animationFrameId: number | null = null;
	const clock = new THREE.Clock();

	// Get the current color value from the store
	let currentColor = $selectedColor;

	// Initialize the 3D scene
	function init() {
		if (!browser) return;

		// Create scene
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf0f0f0);

		// Create camera
		camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 0, 1); // Adjusted camera position for better view

		// Create renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.shadowMap.enabled = true;
		renderer.outputColorSpace = THREE.SRGBColorSpace; // Ensure correct color space
		container.appendChild(renderer.domElement);

		// Add lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);
		directionalLight.castShadow = true;
		scene.add(directionalLight);

		// Add controls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.minDistance = 3;
		controls.maxDistance = 10;
		controls.autoRotate = true; // Add auto-rotation
		controls.autoRotateSpeed = 2; // Rotation speed

		// Load model
		const loader = new GLTFLoader();
		loader.load(
			modelPath,
			(gltf) => {
				model = gltf.scene;

				// Center and scale the model
				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				const size = box.getSize(new THREE.Vector3());

				const maxDim = Math.max(size.x, size.y, size.z);
				const scale = 4 / maxDim; // Increased from 3 to 4 to make the model larger

				model.position.copy(center).multiplyScalar(-1); // Center the model
				model.scale.setScalar(scale);

				scene.add(model);

				// Convert all materials to MeshStandardMaterial
				model.traverse((/** @type {THREE.Object3D} */ child) => {
					if (child instanceof THREE.Mesh) {
						if (Array.isArray(child.material)) {
							child.material = child.material.map((mat) => {
								if (!(mat instanceof THREE.MeshStandardMaterial)) {
									const newMat = new THREE.MeshStandardMaterial({
										color: mat.color,
										metalness: 0.3,
										roughness: 0.7,
										map: mat.map,
										normalMap: mat.normalMap,
										aoMap: mat.aoMap
									});
									mat.dispose(); // Clean up old material
									return newMat;
								}
								return mat;
							});
						} else if (!(child.material instanceof THREE.MeshStandardMaterial)) {
							const oldMat = child.material;
							child.material = new THREE.MeshStandardMaterial({
								color: oldMat.color,
								metalness: 0.3,
								roughness: 0.7,
								map: oldMat.map,
								normalMap: oldMat.normalMap,
								aoMap: oldMat.aoMap
							});
							oldMat.dispose(); // Clean up old material
						}
					}
				});

				// Store reference to the mixer if there are animations
				if (gltf.animations.length) {
					mixer = new THREE.AnimationMixer(model);
					const action = mixer.clipAction(gltf.animations[0]);
					action.play();
				}

				// Update material color
				if (currentColor) {
					updateModelColor(currentColor);
				}
			},
			undefined,
			(error) => {
				console.error('Error loading model:', error);
			}
		);

		// Handle window resize
		window.addEventListener('resize', onWindowResize);
	}

	// Function to update model color
	function updateModelColor(hexColor: string) {
		if (!model || !hexColor) return;

		try {
			const color = new THREE.Color(hexColor);

			model.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					if (Array.isArray(child.material)) {
						child.material.forEach((mat) => {
							if (mat instanceof THREE.MeshStandardMaterial) {
								mat.color.copy(color);
							}
						});
					} else if (child.material instanceof THREE.MeshStandardMaterial) {
						child.material.color.copy(color);
					}
				}
			});
		} catch (error) {
			console.error('Error updating model color:', error);
		}
	}

	// Watch for color changes
	$effect(() => {
		const newColor = $selectedColor;
		if (newColor) {
			currentColor = newColor;
			updateModelColor(newColor);
		}
	});

	// Animation loop
	function animate() {
		if (!browser) return;
		requestAnimationFrame(animate);

		if (controls) {
			controls.update();
		}

		if (mixer) {
			mixer.update(clock.getDelta());
		}

		if (renderer && scene && camera) {
			renderer.render(scene, camera);
		}
	}

	// Handle window resize
	function onWindowResize() {
		if (!browser) return;

		if (camera && renderer && container) {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		}
	}

	// Initialize scene when component mounts
	onMount(() => {
		if (!browser) return;

		init();
		animate();
	});

	// Cleanup when component is destroyed
	onDestroy(() => {
		if (!browser) return;

		// Stop animation loop
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		// Dispose of materials and geometries
		if (model) {
			model.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					if (child.geometry) {
						child.geometry.dispose();
					}
					if (Array.isArray(child.material)) {
						child.material.forEach((mat) => mat.dispose());
					} else if (child.material) {
						child.material.dispose();
					}
				}
			});
		}

		// Dispose of renderer
		if (renderer) {
			renderer.dispose();
		}

		// Remove event listeners
		window.removeEventListener('resize', onWindowResize);
	});
</script>

<div bind:this={container} class="aspect-square w-full overflow-hidden rounded-lg shadow-lg">
	{#if !browser}
		<div class="flex aspect-square w-full items-center justify-center bg-gray-100">
			<p class="text-gray-500">Loading 3D viewer...</p>
		</div>
	{/if}
</div>

<style>
	div {
		touch-action: none; /* Prevents default touch behaviors on mobile */
	}
</style>
