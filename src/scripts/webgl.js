class WebGLCanvas{
    getVertexShader(){
        return  `
        attribute vec2 position;
        varying vec2 texCoords;
        
        void main(){
            texCoords = (position + 1.0) / 2.0;
            texCoords.y = 1.0 - texCoords.y;
            gl_Position = vec4(position, 0, 1.0);
        }
    `;
    }
    getNoneFragShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            gl_FragColor = color;
        }
    `;
    }
    getArticFragShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            color.b = color.b + 0.2 + texCoords.x*0.2;
            gl_FragColor = color;
        }
    `;
    }
    getSaharaFragShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            color.r = color.r + 0.2 + texCoords.x*0.1;
            gl_FragColor = color;
        }
    `;
    }
    getVintageFragShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            color.r = color.r * 0.8 - texCoords.x*0.2;
            color.g = color.g * 0.8 - texCoords.x*0.2;
            color.b = color.b * 0.8 - texCoords.x*0.2;
            color.r = color.r + 0.1;
            color.g = color.g + 0.1;
            gl_FragColor = color;
        }
    `;
    }
    getGlowShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            color.r = color.r / 0.7 + texCoords.x*0.2;
            color.g = color.g / 0.7 + texCoords.x*0.2;
            color.b = color.b / 0.7 + texCoords.x*0.2;
            gl_FragColor = color;
        }
    `;
    }
    getOtyShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            float r = color.r;
            float g = color.g;
            float b = color.b;
            float w = (r+g+b)/3.0;
            if(w<0.30){
                w=0.0;
                color.r = 56.0/256.0;
                color.g = 73.0/256.0;
                color.b = 171.0/256.0;
            }
            else{
                w=1.0;
                color.r = 211.0/256.0;
                color.b = 47.0/256.0;
                color.g = 47.0/256.0;
            }
            gl_FragColor = color;
        }
    `;
    }
    getDevilShaderSrc(){
        return  `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main(){            
            vec4 color =  texture2D(textureSampler, texCoords);
            float r = 95.0/256.0;
            float g = 40.0/256.0;
            float b = 20.0/256.0;
            if(color.r>r && color.g>g && color.b>b){
                color.r = color.r+0.2;
            }
            gl_FragColor = color;
        }
    `;
    }
    constructor(canvas){
        this.canvas = canvas;

        this.gl = canvas.getContext('webgl');
        
        this.vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.noneFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.articFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.saharaFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.vintageFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.glowFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.otyFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.devilFragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        
        this.gl.shaderSource(this.vertShader, this.getVertexShader());
        this.gl.shaderSource(this.noneFragShader, this.getNoneFragShaderSrc());
        this.gl.shaderSource(this.articFragShader,this.getArticFragShaderSrc());
        this.gl.shaderSource(this.saharaFragShader,this.getSaharaFragShaderSrc());
        this.gl.shaderSource(this.vintageFragShader,this.getVintageFragShaderSrc());
        this.gl.shaderSource(this.glowFragShader,this.getGlowShaderSrc());
        this.gl.shaderSource(this.otyFragShader,this.getOtyShaderSrc());
        this.gl.shaderSource(this.devilFragShader,this.getDevilShaderSrc());
        console.log(this.vertexShader);

        this.gl.compileShader(this.vertShader);
        this.gl.compileShader(this.noneFragShader);
        this.gl.compileShader(this.articFragShader);
        this.gl.compileShader(this.saharaFragShader);
        this.gl.compileShader(this.vintageFragShader);
        this.gl.compileShader(this.glowFragShader);
        this.gl.compileShader(this.otyFragShader);
        this.gl.compileShader(this.devilFragShader);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.noneFragShader);
        
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
    
        const vertices = new Float32Array([
                -1,-1,
                -1,1,
                1,1,
                -1,-1,
                1,1,
                1,-1
        ]);
    
        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        console.log(positionLocation);
    
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionLocation);
    
    }
    redraw(image){
        this.canvas.height = image.naturalHeight;
        this.canvas.width = image.naturalWidth;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.calculateCSSDimens(image);
        
        const texture = this.gl.createTexture();
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D,0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);
    
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    calculateCSSDimens(image){
        let height = 0;
        let width = 0;
        if(screen.height < screen.width){
            console.log("desktop");
            let aHeight = image.naturalHeight / image.naturalHeight;
            let aWidth = image.naturalWidth / image.naturalHeight;
            console.log("a",aHeight,aWidth);
            height = (screen.height/2)*aHeight;
            width = (screen.height/2)*aWidth;
        }
        else{
            console.log("mobile");
            let aHeight = image.naturalHeight / image.naturalWidth;
            let aWidth = image.naturalWidth / image.naturalWidth;
            height = (screen.width)*aHeight;
            width = (screen.width)*aWidth;
        }
        console.log(screen.height,height);
        console.log(screen.width,width);
        this.canvas.style.height = height+"px";
        this.canvas.style.width = width+"px";
    }
    drawNone(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.noneFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6); 
    }
    drawArticFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.articFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    drawSaharaFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.saharaFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    drawVintageFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.vintageFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    drawGlowFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.glowFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    drawOtyFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.otyFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    drawDevilFilter(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertShader);
        this.gl.attachShader(this.program,this.devilFragShader);
    
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

}
