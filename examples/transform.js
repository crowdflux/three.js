var annotationData = {
    "coordinates": [
        {
        "x": 9.241470142772986,
        "y": 6.39528334499659,
        "z": -1.7403022495187468
        },
        {
        "x": 7.273156342056906,
        "y": 1.9743781660050992,
        "z": -1.7403022495187468
        },
        {
        "x": 8.871519761570639,
        "y": 1.262740922089744,
        "z": -1.7403022495187468
        },
        {
        "x": 10.839833562286719,
        "y": 5.6836461010812345,
        "z": -1.7403022495187468
        },
        {
        "x": 9.241470142772986,
        "y": 6.39528334499659,
        "z": 0.2596977504812532
        },
        {
        "x": 7.273156342056906,
        "y": 1.9743781660050992,
        "z": 0.2596977504812532
        },
        {
        "x": 8.871519761570639,
        "y": 1.262740922089744,
        "z": 0.2596977504812532
        },
        {
        "x": 10.839833562286719,
        "y": 5.6836461010812345,
        "z": 0.2596977504812532
        }
    ],
    "center": {
        "x": 9.056494952171812,
        "y": 3.829012133543167,
        "z": -0.7403022495187468
    },
    "rotation": {
        "x": 0,
        "y": Math.PI/4,
        "z": Math.PI/2
    },
    "heading_radians": 2.7227136331111548,
    "_id": "3d20bdf8-d87c-4a15-a5ce-30b2cb70d6ad",
    "attributes": {},
    "two_d_projection_points": {
        "p1": {
        "x": 0.08448267070882574,
        "y": 0.8710089626825614
        },
        "p2": {
        "x": 0.3389593260987943,
        "y": 0.9499041643660616
        },
        "p3": {
        "x": 0.41527450234666996,
        "y": 0.857816322850376
        },
        "p4": {
        "x": 0.18527218979457136,
        "y": 0.8079961903253688
        },
        "p5": {
        "x": 0.08200326672053049,
        "y": 0.4418128015370017
        },
        "p6": {
        "x": 0.33510041310128796,
        "y": 0.4005572156164696
        },
        "p7": {
        "x": 0.41196593912495233,
        "y": 0.41087847950380263
        },
        "p8": {
        "x": 0.18298826184984626,
        "y": 0.44396815174589166
        }
    },
    "dimensions": {
        "length": 1.7496265852367126,
        "width": 4.8392831927593525,
        "height": 2
    }
};

function makeTransoformationMatrix(annotationData) {
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationFromEuler(new THREE.Euler(annotationData.rotation.x, annotationData.rotation.y, annotationData.rotation.z))
    transformationMatrix.makeTranslation(annotationData.center.x, annotationData.center.y, annotationData.center.z);
    transformationMatrix.multiply(rotationMatrix);
    return transformationMatrix;
}

function getPosInBoxCoord(worldPosition) {
    var transformationMatrix = makeTransoformationMatrix(annotationData);
    var worldToBox = new THREE.Matrix4();
    worldToBox.getInverse(transformationMatrix);
    var posInBoxCoord = worldPosition.clone();
    posInBoxCoord.applyMatrix4(worldToBox);
    return posInBoxCoord;
}

function isInsideBox(worldPosition) {
    var posInBoxCoord = getPosInBoxCoord(worldPosition);

    var aabb = new THREE.Box3();
    aabb.setFromCenterAndSize(new THREE.Vector3(0, 0, 0), new THREE.Vector3(annotationData.dimensions.length, annotationData.dimensions.width, annotationData.dimensions.height));
    return aabb.containsPoint(posInBoxCoord);
}