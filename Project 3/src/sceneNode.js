/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        let localModelMatrix = this.trs.getTransformationMatrix();
        let globalModelMatrix = MatrixMult(modelMatrix, localModelMatrix); 
    
        // Transform matrices
        var transformedMvp = MatrixMult(mvp, globalModelMatrix);
        var transformedModelView = MatrixMult(modelView, globalModelMatrix);
        var transformedNormals = MatrixMult(normalMatrix, globalModelMatrix); 
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, globalModelMatrix);
        }
    
        // Draw the children node recursively
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, globalModelMatrix);
        }
    }    
}