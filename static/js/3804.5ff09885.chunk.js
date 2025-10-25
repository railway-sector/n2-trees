"use strict";(self.webpackChunkn2_trees=self.webpackChunkn2_trees||[]).push([[3804],{19061:(e,t,n)=>{n.d(t,{H:()=>R,b:()=>D,c:()=>H,f:()=>T});var o=n(19555),i=n(72745),r=n(55855),a=n(14556),s=n(26917),l=n(90080),c=n(98720),u=n(40318),f=n(38280),p=n(62374),d=n(87236),h=n(66763),v=n(80883),g=n(69817),m=n(3799),x=n(95756),w=n(51596),b=n(20123),y=n(58350),C=n(23148),P=n(21390),A=n(86955),S=n(4653),z=n(70367),O=n(2687),M=n(75569);function D(e){const t=new O.N5,{signedDistanceFieldEnabled:n,occlusionTestEnabled:i,horizonCullingEnabled:D,pixelSnappingEnabled:T,hasScreenSizePerspective:R,debugDrawLabelBorder:E,hasVVSize:_,hasVVColor:I,hasRotation:U,occludedFragmentFade:$,sampleSignedDistanceFieldTexelCenter:B}=e;t.include(u.Q,e),t.vertex.include(s.rA,e);const{occlusionPass:W,output:G,oitPass:N}=e;if(W)return t.include(f.I,e),t;const{vertex:q,fragment:L}=t;t.include(g.Y6),t.include(h.A,e),t.include(l.g,e),i&&t.include(p.y),L.include(v.a),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const Y=9===G,Q=Y&&i;Q&&t.varyings.add("voccluded","float"),q.uniforms.add(new w.I("viewport",e=>e.camera.fullViewport),new x.G("screenOffset",(e,t)=>(0,o.hZ)(F,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio)),new x.G("anchorPosition",e=>H(e)),new y.E("materialColor",e=>e.color),new P.m("materialRotation",e=>e.rotation),new z.N("tex",e=>e.texture)),(0,m.Nz)(q),n&&(q.uniforms.add(new y.E("outlineColor",e=>e.outlineColor)),L.uniforms.add(new y.E("outlineColor",e=>V(e)?e.outlineColor:r.uY),new P.m("outlineSize",e=>V(e)?e.outlineSize:0))),D&&q.uniforms.add(new b.V("pointDistanceSphere",(e,t)=>{const n=t.camera.eye,o=e.origin;return(0,r.fA)(o[0]-n[0],o[1]-n[1],o[2]-n[2],a.$O.radius)})),T&&q.include(c.K),R&&((0,g.pM)(q),(0,g.OH)(q)),E&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add("uv0","vec2"),t.attributes.add("uvi","vec4"),t.attributes.add("color","vec4"),t.attributes.add("size","vec2"),t.attributes.add("rotation","float"),(_||I)&&t.attributes.add("featureAttribute","vec4"),q.code.add(D?A.H`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:A.H`bool behindHorizon(vec3 posModel) { return false; }`),q.main.add(A.H`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${(0,A.If)(R,A.H`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,A.H`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${(0,A.If)(_,A.H`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${(0,A.If)(i,A.H`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${(0,A.If)(E,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${(0,A.If)(Q,A.H`voccluded = visible ? 0.0 : 1.0;`)}
  `);const k=A.H`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${j})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${(0,A.If)(U,A.H`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,Z=T?n?A.H`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:A.H`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:A.H`posProj += quadOffset;`;q.main.add(A.H`
    ${k}
    ${I?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${(0,A.If)(10===G,A.H`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${A.H.float(M.Q)};
    ${(0,A.If)(n,`alphaDiscard = alphaDiscard && outlineColor.a < ${A.H.float(M.Q)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${Z}
      gl_Position = posProj;
    }

    vtc = uv;

    ${(0,A.If)(E,A.H`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),L.uniforms.add(new z.N("tex",e=>e.texture)),$&&!Y&&L.uniforms.add(new S.x("depthMap",e=>e.mainDepth),new C.U("occludedOpacity",e=>e.hudOccludedFragmentOpacity));const X=E?A.H`(isBorder > 0.0 ? 0.0 : ${A.H.float(M.Q)})`:A.H.float(M.Q),J=A.H`
    ${(0,A.If)(E,A.H`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${(0,A.If)(B,A.H`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${n?A.H`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${X} ||
          fillPixelColor.a + outlinePixelColor.a < ${A.H.float(M.Q)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${(0,A.If)(!Y,A.H`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${X}) {
          discard;
        }

        ${(0,A.If)(!Y,A.H`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:A.H`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${X}) {
            discard;
          }
          ${(0,A.If)(!Y,A.H`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${(0,A.If)($&&!Y,A.H`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${(0,A.If)(!Y&&E,A.H`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(G){case 0:case 1:t.outputs.add("fragColor","vec4",0),1===G&&t.outputs.add("fragEmission","vec4",1),1===N&&t.outputs.add("fragAlpha","float",1===G?2:1),L.main.add(A.H`
        ${J}
        ${(0,A.If)(2===N,A.H`fragColor.rgb /= fragColor.a;`)}
        ${(0,A.If)(1===G,A.H`fragEmission = vec4(0.0);`)}
        ${(0,A.If)(1===N,A.H`fragAlpha = fragColor.a;`)}`);break;case 10:L.main.add(A.H`
        ${J}
        outputObjectAndLayerIdColor();`);break;case 9:t.include(d.Q,e),L.main.add(A.H`
        ${J}
        outputHighlight(${(0,A.If)(Q,A.H`voccluded == 1.0`,A.H`false`)});`)}return t}function V(e){return e.outlineColor[3]>0&&e.outlineSize>0}function H(e){return e.textureIsSignedDistanceField?function(e,t,n){(0,o.hZ)(n,e[0]*(t[2]-t[0])+t[0],e[1]*(t[3]-t[1])+t[1])}(e.anchorPosition,e.distanceFieldBoundingBox,F):(0,o.C)(F,e.anchorPosition),F}const F=(0,i.vt)(),T=32e3,j=A.H.float(T),R=Object.freeze(Object.defineProperty({__proto__:null,build:D,calculateAnchorPosition:H,fullUV:T},Symbol.toStringTag,{value:"Module"}))},20123:(e,t,n)=>{n.d(t,{V:()=>i});var o=n(87003);class i extends o.n{constructor(e,t,n){super(e,"vec4",2,(o,i,r)=>o.setUniform4fv(e,t(i,r),n))}}},36423:(e,t,n)=>{n.d(t,{$2:()=>z,$C:()=>C,Hj:()=>A,Mh:()=>S,W$:()=>m,pW:()=>P,t8:()=>y,vY:()=>O});var o=n(31633),i=n(34761),r=n(13191),a=n(9392),s=n(43047),l=n(55855),c=n(56611),u=n(42294),f=n(2413),p=n(205),d=n(5262),h=n(99773),v=n(18117),g=n(32535);function m(e,t){if("point"===e.type)return b(e,t,!1);if((0,g.gr)(e))switch(e.type){case"extent":return b(e.center,t,!1);case"polygon":return b(w(e),t,!1);case"polyline":return b(x(e),t,!0);case"mesh":return b((0,h.MW)(e.vertexSpace,e.spatialReference)??e.extent.center,t,!1);case"multipoint":return}else switch(e.type){case"extent":return b(function(e){return(0,v.TH)(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),null!=e.zmin&&null!=e.zmax&&isFinite(e.zmin)&&isFinite(e.zmax)?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}(e),t,!0);case"polygon":return b(w(e),t,!0);case"polyline":return b(x(e),t,!0);case"multipoint":return}}function x(e){const t=e.paths[0];if(!t||0===t.length)return null;const n=(0,d.$H)(t,(0,d.Yl)(t)/2);return(0,v.TH)(n[0],n[1],n[2],e.spatialReference)}function w(e){const t=e.rings[0];if(!t||0===t.length)return null;const n=(0,p.S8)(e.rings,!!e.hasZ);return(0,v.TH)(n[0],n[1],n[2],e.spatialReference)}function b(e,t,n){const o=n?e:(0,g.EL)(e);return t&&e?(0,c.projectPoint)(e,o,t)?o:null:o}function y(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e){t||(t=(0,f.vt)());const i=e;let r=.5*i.width*(n-1),a=.5*i.height*(n-1);return i.width<1e-7*i.height?r+=a/20:i.height<1e-7*i.width&&(a+=r/20),(0,s.s)(t,i.xmin-r-o,i.ymin-a-o,i.xmax+r+o,i.ymax+a+o),t}return null}function C(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const o=(0,l.o8)(l.Un);return null!=e&&(o[0]=e[0],o[1]=e[1],o[2]=e[2],e.length>3&&(o[3]=e[3])),null!=t&&(o[3]=t),n&&(0,s.c)(o,o,n),o}function P(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.Un,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;const i=new Array(3);if(null==t||null==n)i[0]=1,i[1]=1,i[2]=1;else{let o,r=0;for(let a=2;a>=0;a--){const s=e[a],l=null!=s,c=0===a&&!o&&!l,u=n[a];let f;"symbol-value"===s||c?f=0!==u?t[a]/u:1:l&&"proportional"!==s&&isFinite(s)&&(f=0!==u?s/u:1),null!=f&&(i[a]=f,o=f,r=Math.max(r,Math.abs(f)))}for(let e=2;e>=0;e--)null==i[e]?i[e]=o:0===i[e]&&(i[e]=.001*r)}for(let r=2;r>=0;r--)i[r]/=o;return(0,a.ci)(i)}function A(e){return S(function(e){return null!=e.isPrimitive}(e)?[e.width,e.depth,e.height]:e)?null:"Symbol sizes may not be negative values"}function S(e){const t=e=>null==e||e>=0;return Array.isArray(e)?e.every(t):t(e)}function z(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:(0,r.vt)();return e&&(0,i.Qr)(o,o,-e/180*Math.PI),t&&(0,i.eL)(o,o,t/180*Math.PI),n&&(0,i.Z8)(o,o,n/180*Math.PI),o}function O(e,t,n){if(null!=n.minDemResolution)return n.minDemResolution;const i=(0,o.GA)(t),r=(0,u.VL)(e)*i,a=(0,u.yr)(e)*i,s=(0,u.uJ)(e)*(t.isGeographic?1:i);return 0===r&&0===a&&0===s?n.minDemResolutionForPoints:.01*Math.max(r,a,s)}},38280:(e,t,n)=>{n.d(t,{I:()=>a});var o=n(98720),i=n(94192),r=n(86955);function a(e,t){const{vertex:n,fragment:a}=e;e.include(i.Z,t),n.include(o.K),n.main.add(r.H`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),a.main.add(r.H`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}},40318:(e,t,n)=>{n.d(t,{Q:()=>f,R:()=>u});var o=n(25530),i=n(69817),r=n(3799),a=n(51596),s=n(23148),l=n(21390),c=n(86955);const u=.5;function f(e,t){e.include(i.Y6),e.attributes.add("position","vec3"),e.attributes.add("normal","vec3"),e.attributes.add("centerOffsetAndDistance","vec4");const n=e.vertex;(0,r.NB)(n,t),(0,r.yu)(n,t),n.uniforms.add(new a.I("viewport",e=>e.camera.fullViewport),new l.m("polygonOffset",e=>e.shaderPolygonOffset),new s.U("cameraGroundRelative",e=>e.camera.aboveGround?1:-1)),t.hasVerticalOffset&&(0,o.VQ)(n),n.code.add(c.H`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),n.code.add(c.H`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${t.terrainDepthTest?c.H.float(0):c.H`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),t.draped&&!t.hasVerticalOffset||(0,r.S7)(n),t.draped||(n.uniforms.add(new s.U("perDistancePixelRatio",e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2))),n.code.add(c.H`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${c.H.float(u)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),t.screenCenterOffsetUnitsEnabled&&(0,r.Nz)(n),t.hasScreenSizePerspective&&(0,i.OH)(n),n.code.add(c.H`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${t.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${t.hasScreenSizePerspective&&(t.hasVerticalOffset||t.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${t.hasVerticalOffset?t.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${t.hasVerticalOffset?c.H`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${t.screenCenterOffsetUnitsEnabled?"":c.H`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${t.screenCenterOffsetUnitsEnabled?t.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${t.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}},62374:(e,t,n)=>{n.d(t,{y:()=>l});var o=n(98720),i=n(51596),r=n(23148),a=n(86955),s=n(4653);function l(e){e.vertex.uniforms.add(new r.U("renderTransparentlyOccludedHUD",e=>0===e.hudRenderStyle?1:1===e.hudRenderStyle?0:.75),new i.I("viewport",e=>e.camera.fullViewport),new s.x("hudVisibilityTexture",e=>e.hudVisibility?.getTexture())),e.vertex.include(o.K),e.vertex.code.add(a.H`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}},70667:(e,t,n)=>{n.d(t,{Uf:()=>m,te:()=>h,xJ:()=>w,zh:()=>x});var o=n(19555),i=n(72745),r=n(55855),a=n(34111),s=n(482),l=n(44815),c=n(75002),u=n(94587),f=n(38496),p=n(50468),d=n(17345);function h(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;const i=[],u=t.mapPositions,h=function(e,t){const{attributeData:{position:n},removeDuplicateStartEnd:o}=e,i=function(e){const t=e.length;return e[0]===e[t-3]&&e[1]===e[t-2]&&e[2]===e[t-1]}(n)&&o,r=n.length/3-(i?1:0),a=new Array(2*(r-1)),s=i?n.slice(0,-3):n;let l=0;for(let u=0;u<r-1;u++)a[l++]=u,a[l++]=u+1;const c=new p.n(s,a,3,i);return t.push(["position",c]),c}(t,i),x=h.data,w=h.indices.length,b=(0,f.EH)(w);return function(e,t,n){if(null!=e.attributeData.colorFeature)return;const o=e.attributeData.color;t.push(["color",new p.n(o??r.Un,n,4)])}(t,i,b),function(e,t,n){null==e.attributeData.sizeFeature&&t.push(["size",new p.n([e.attributeData.size??1],n,1,!0)])}(t,i,b),function(e,t,n){e.attributeData.normal&&t.push(["normal",new p.n(e.attributeData.normal,n,3)])}(t,i,b),function(e,t,n,o){const i=e.attributeData.colorFeature;null!=i&&("number"==typeof i?t.push(["colorFeatureAttribute",new p.n([i],o,1,!0)]):t.push(["colorFeatureAttribute",new p.n(i,n,1,!0)]))}(t,i,h.indices,b),function(e,t,n,o){const i=e.attributeData.sizeFeature;null!=i&&("number"==typeof i?t.push(["sizeFeatureAttribute",new p.n([i],o,1,!0)]):t.push(["sizeFeatureAttribute",new p.n(i,n,1,!0)]))}(t,i,h.indices,b),function(e,t){const{attributeData:{position:n,timeStamps:o}}=e;if(!o)return;const i=n.length/3,r=new Array(2*(i-1));let a=0;for(let s=0;s<i-1;s++)r[a++]=s,r[a++]=s+1;t.push(["timeStamps",new p.n(o,r,m,!0)])}(t,i),function(e,t,n,o){const i=e.attributeData.opacityFeature;null!=i&&("number"==typeof i?t.push(["opacityFeatureAttribute",new p.n([i],o,1,!0)]):t.push(["opacityFeatureAttribute",new p.n(i,n,1,!0)]))}(t,i,h.indices,b),function(e,t,n){if(null==e.overlayInfo||1!==e.overlayInfo.renderCoordsHelper.viewingMode||!e.overlayInfo.spatialReference.isGeographic)return;const i=(0,l.jh)(n.length),r=(0,a.tO)(e.overlayInfo.spatialReference);for(let o=0;o<i.length;o+=3)(0,s.RC)(n,o,i,o,r);const u=n.length/3,f=(0,c.oe)(u+1);let d=v,h=g,m=0,x=0;(0,o.hZ)(d,i[x++],i[x++]),x++,f[0]=0;for(let a=1;a<u+1;++a)a===u&&(x=0),(0,o.hZ)(h,i[x++],i[x++]),x++,m+=(0,o.xg)(d,h),f[a]=m,[d,h]=[h,d];t.push(["distanceToStart",new p.n(f,t[0][1].indices,1,!0)])}(t,i,x),new d.V(e,i,u,2,n)}const v=(0,i.vt)(),g=(0,i.vt)(),m=4;function x(e,t,n,o,i){if(null==e||0===e.length)return[];const r=[];return e.forEach((e,a)=>{const s=e.length,c=(0,l.jh)(3*s);e.forEach((e,t)=>{c[3*t]=e[0],c[3*t+1]=e[1],c[3*t+2]=e[2]});const u={attributeData:{position:c,normal:t,colorFeature:n?.[a],opacityFeature:o?.[a],sizeFeature:i?.[a]},removeDuplicateStartEnd:!1};r.push(u)}),r}function w(e,t){const n=(0,u.fY)(e.length*m),o=e[0],i=e[e.length-1];for(let r=0;r<e.length;r++)n[r*m]=e[r],n[r*m+1]=o,n[r*m+2]=i,n[r*m+3]=t+.5;return n}},72017:(e,t,n)=>{n.d(t,{zC:()=>se,C1:()=>O,EE:()=>ee,YG:()=>K,nW:()=>te,td:()=>F,_B:()=>re,Nq:()=>oe,DJ:()=>Z,Y6:()=>k,uX:()=>Q,Z8:()=>ie,CM:()=>Y,Gj:()=>J,Ho:()=>L,Nb:()=>ne,Xl:()=>ce,xh:()=>ae});var o=n(20664),i=n(83755),r=n(9392),a=n(44815),s=n(75002),l=n(38496),c=n(13927),u=n(95925),f=n(70667),p=n(50468);function d(e,t){const n=e[t],o=e[t+1],i=e[t+2];return Math.sqrt(n*n+o*o+i*i)}function h(e,t){const n=e[t],o=e[t+1],i=e[t+2],r=1/Math.sqrt(n*n+o*o+i*i);e[t]*=r,e[t+1]*=r,e[t+2]*=r}function v(e,t,n){e[t]*=n,e[t+1]*=n,e[t+2]*=n}var g=n(17345),m=n(86994),x=n(15796);function w(){return b??=function(){const e=0,t=255,n=new p.n([e,e,e,t,t,e,t,t],[0,1,2,3],2,!0);return new x.F([["uv0",n]])}(),b}let b=null;const y=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],C=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],P=[0,0,1,0,1,1,0,1],A=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],S=new Array(36);for(let pe=0;pe<6;pe++)for(let e=0;e<6;e++)S[6*pe+e]=pe;const z=new Array(36);for(let pe=0;pe<6;pe++)z[6*pe]=0,z[6*pe+1]=1,z[6*pe+2]=2,z[6*pe+3]=2,z[6*pe+4]=3,z[6*pe+5]=0;function O(e,t){Array.isArray(t)||(t=[t,t,t]);const n=new Array(24);for(let o=0;o<8;o++)n[3*o]=y[o][0]*t[0],n[3*o+1]=y[o][1]*t[1],n[3*o+2]=y[o][2]*t[2];return new g.V(e,[["position",new p.n(n,A,3,!0)],["normal",new p.n(C,S,3)],["uv0",new p.n(P,z,2)]])}const M=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],D=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],V=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],H=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function F(e,t){Array.isArray(t)||(t=[t,t,t]);const n=new Array(18);for(let o=0;o<6;o++)n[3*o]=M[o][0]*t[0],n[3*o+1]=M[o][1]*t[1],n[3*o+2]=M[o][2]*t[2];return new g.V(e,[["position",new p.n(n,V,3,!0)],["normal",new p.n(D,H,3)]])}const T=(0,i.fA)(-.5,0,-.5),j=(0,i.fA)(.5,0,-.5),R=(0,i.fA)(0,0,.5),E=(0,i.fA)(0,.5,0),_=(0,i.vt)(),I=(0,i.vt)(),U=(0,i.vt)(),$=(0,i.vt)(),B=(0,i.vt)();(0,o.e)(_,T,E),(0,o.e)(I,T,j),(0,o.i)(U,_,I),(0,o.n)(U,U),(0,o.e)(_,j,E),(0,o.e)(I,j,R),(0,o.i)($,_,I),(0,o.n)($,$),(0,o.e)(_,R,E),(0,o.e)(I,R,T),(0,o.i)(B,_,I),(0,o.n)(B,B);const W=[T,j,R,E],G=[0,-1,0,U[0],U[1],U[2],$[0],$[1],$[2],B[0],B[1],B[2]],N=[0,1,2,3,1,0,3,2,1,3,0,2],q=[0,0,0,1,1,1,2,2,2,3,3,3];function L(e,t){Array.isArray(t)||(t=[t,t,t]);const n=new Array(12);for(let o=0;o<4;o++)n[3*o]=W[o][0]*t[0],n[3*o+1]=W[o][1]*t[1],n[3*o+2]=W[o][2]*t[2];return new g.V(e,[["position",new p.n(n,N,3,!0)],["normal",new p.n(G,q,3)]])}function Y(e,t,n,o){let i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{uv:!0};const r=-Math.PI,a=2*Math.PI,c=-Math.PI/2,u=Math.PI,f=Math.max(3,Math.floor(n)),d=Math.max(2,Math.floor(o)),h=(f+1)*(d+1),v=(0,s.oe)(3*h),m=(0,s.oe)(3*h),x=(0,s.oe)(2*h),w=[];let b=0;for(let s=0;s<=d;s++){const e=[],n=s/d,o=c+n*u,i=Math.cos(o);for(let s=0;s<=f;s++){const l=s/f,c=r+l*a,u=Math.cos(c)*i,p=Math.sin(o),d=-Math.sin(c)*i;v[3*b]=u*t,v[3*b+1]=p*t,v[3*b+2]=d*t,m[3*b]=u,m[3*b+1]=p,m[3*b+2]=d,x[2*b]=l,x[2*b+1]=n,e.push(b),++b}w.push(e)}const y=new Array;for(let s=0;s<d;s++)for(let e=0;e<f;e++){const t=w[s][e],n=w[s][e+1],o=w[s+1][e+1],i=w[s+1][e];0===s?(y.push(t),y.push(o),y.push(i)):s===d-1?(y.push(t),y.push(n),y.push(o)):(y.push(t),y.push(n),y.push(o),y.push(o),y.push(i),y.push(t))}const C=[["position",new p.n(v,y,3,!0)],["normal",new p.n(m,y,3,!0)]];return i.uv&&C.push(["uv0",new p.n(x,y,2,!0)]),i.offset&&(C[0][0]="offset",C.push(["position",new p.n(Float64Array.from(i.offset),(0,l.EH)(y.length),3,!0)])),new g.V(e,C)}function Q(e,t,n,o){const i=k(t,n,o);return new g.V(e,i)}function k(e,t,n){const o=e;let i,r;if(n)i=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],r=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];else{const e=o*(1+Math.sqrt(5))/2;i=[-o,e,0,o,e,0,-o,-e,0,o,-e,0,0,-o,e,0,o,e,0,-o,-e,0,o,-e,e,0,-o,e,0,o,-e,0,-o,-e,0,o],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1]}for(let s=0;s<i.length;s+=3)v(i,s,e/d(i,s));let a={};function l(t,n){t>n&&([t,n]=[n,t]);const o=t.toString()+"."+n.toString();if(a[o])return a[o];let r=i.length;return i.length+=3,function(e,t,n,o,i){let r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:t;(i=i||e)[r]=e[t]+n[o],i[r+1]=e[t+1]+n[o+1],i[r+2]=e[t+2]+n[o+2]}(i,3*t,i,3*n,i,r),v(i,r,e/d(i,r)),r/=3,a[o]=r,r}for(let s=0;s<t;s++){const e=r.length,t=new Array(4*e);for(let n=0;n<e;n+=3){const e=r[n],o=r[n+1],i=r[n+2],a=l(e,o),s=l(o,i),c=l(i,e),u=4*n;t[u]=e,t[u+1]=a,t[u+2]=c,t[u+3]=o,t[u+4]=s,t[u+5]=a,t[u+6]=i,t[u+7]=c,t[u+8]=s,t[u+9]=a,t[u+10]=s,t[u+11]=c}r=t,a={}}const c=(0,s.Wz)(i);for(let s=0;s<c.length;s+=3)h(c,s);return[["position",new p.n((0,s.Wz)(i),r,3,!0)],["normal",new p.n(c,r,3,!0)]]}function Z(e){let{normal:t,position:n,color:o,rotation:i,size:a,centerOffsetAndDistance:s,uvi:c,featureAttribute:u,olidColor:f=null}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const d=n?(0,r.o8)(n):(0,r.vt)(),h=t?(0,r.o8)(t):(0,r.fA)(0,0,1),v=o?[o[0],o[1],o[2],o.length>3?o[3]:255]:[255,255,255,255],m=null!=a&&2===a.length?a:[1,1],x=null!=i?[i]:[0],b=(0,l.EH)(1),y=[["position",new p.n(d,b,3,!0)],["normal",new p.n(h,b,3,!0)],["color",new p.n(v,b,4,!0)],["size",new p.n(m,b,2)],["rotation",new p.n(x,b,1,!0)]];if(c&&y.push(["uvi",new p.n(c,b,c.length)]),null!=s){const e=[s[0],s[1],s[2],s[3]];y.push(["centerOffsetAndDistance",new p.n(e,b,4)])}if(u){const e=[u[0],u[1],u[2],u[3]];y.push(["featureAttribute",new p.n(e,b,4)])}return new g.V(e,y,null,1,f,void 0,w())}const X=[[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]];function J(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:X;const n=new Array(12);for(let a=0;a<4;a++)for(let e=0;e<3;e++)n[3*a+e]=t[a][e];const o=[0,1,2,2,3,0],i=[0,0,0,0,0,0],r=[["position",new p.n(n,o,3,!0)],["normal",new p.n([0,0,1],i,3,!0)],["uv0",new p.n([0,0,1,0,1,1,0,1],o,2,!0)],["color",new p.n([255,255,255,255],i,4,!0)]];return new g.V(e,r)}function K(e,t,n,o){let r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],l=0;const c=t,u=e;let f=(0,i.fA)(0,l,0),d=(0,i.fA)(0,l+u,0),h=(0,i.fA)(0,-1,0),v=(0,i.fA)(0,1,0);o&&(l=u,d=(0,i.fA)(0,0,0),f=(0,i.fA)(0,l,0),h=(0,i.fA)(0,1,0),v=(0,i.fA)(0,-1,0));const g=[d,f],m=[h,v],x=n+2,w=Math.sqrt(u*u+c*c);if(o)for(let s=n-1;s>=0;s--){const e=s*(2*Math.PI/n),t=(0,i.fA)(Math.cos(e)*c,l,Math.sin(e)*c);g.push(t);const o=(0,i.fA)(u*Math.cos(e)/w,-c/w,u*Math.sin(e)/w);m.push(o)}else for(let s=0;s<n;s++){const e=s*(2*Math.PI/n),t=(0,i.fA)(Math.cos(e)*c,l,Math.sin(e)*c);g.push(t);const o=(0,i.fA)(u*Math.cos(e)/w,c/w,u*Math.sin(e)/w);m.push(o)}const b=new Array,y=new Array;if(r){for(let e=3;e<g.length;e++)b.push(1),b.push(e-1),b.push(e),y.push(0),y.push(0),y.push(0);b.push(g.length-1),b.push(2),b.push(1),y.push(0),y.push(0),y.push(0)}if(a){for(let e=3;e<g.length;e++)b.push(e),b.push(e-1),b.push(0),y.push(e),y.push(e-1),y.push(1);b.push(0),b.push(2),b.push(g.length-1),y.push(1),y.push(2),y.push(m.length-1)}const C=(0,s.oe)(3*x);for(let i=0;i<x;i++)C[3*i]=g[i][0],C[3*i+1]=g[i][1],C[3*i+2]=g[i][2];const P=(0,s.oe)(3*x);for(let i=0;i<x;i++)P[3*i]=m[i][0],P[3*i+1]=m[i][1],P[3*i+2]=m[i][2];return[["position",new p.n(C,b,3,!0)],["normal",new p.n(P,y,3,!0)]]}function ee(e,t,n,o,i){let r=!(arguments.length>5&&void 0!==arguments[5])||arguments[5],a=!(arguments.length>6&&void 0!==arguments[6])||arguments[6];return new g.V(e,K(t,n,o,i,r,a))}function te(e,t,n,r,a,l,c){const u=a?(0,i.o8)(a):(0,i.fA)(1,0,0),f=l?(0,i.o8)(l):(0,i.fA)(0,0,0);c??=!0;const d=(0,i.vt)();(0,o.n)(d,u);const h=(0,i.vt)();(0,o.h)(h,d,Math.abs(t));const v=(0,i.vt)();(0,o.h)(v,h,-.5),(0,o.g)(v,v,f);const m=(0,i.fA)(0,1,0);Math.abs(1-(0,o.f)(d,m))<.2&&(0,o.j)(m,0,0,1);const x=(0,i.vt)();(0,o.i)(x,d,m),(0,o.n)(x,x),(0,o.i)(m,x,d);const w=2*r+(c?2:0),b=r+(c?2:0),y=(0,s.oe)(3*w),C=(0,s.oe)(3*b),P=(0,s.oe)(2*w),A=new Array(3*r*(c?4:2)),S=new Array(3*r*(c?4:2));c&&(y[3*(w-2)]=v[0],y[3*(w-2)+1]=v[1],y[3*(w-2)+2]=v[2],P[2*(w-2)]=0,P[2*(w-2)+1]=0,y[3*(w-1)]=y[3*(w-2)]+h[0],y[3*(w-1)+1]=y[3*(w-2)+1]+h[1],y[3*(w-1)+2]=y[3*(w-2)+2]+h[2],P[2*(w-1)]=1,P[2*(w-1)+1]=1,C[3*(b-2)]=-d[0],C[3*(b-2)+1]=-d[1],C[3*(b-2)+2]=-d[2],C[3*(b-1)]=d[0],C[3*(b-1)+1]=d[1],C[3*(b-1)+2]=d[2]);const z=(e,t,n)=>{A[e]=t,S[e]=n};let O=0;const M=(0,i.vt)(),D=(0,i.vt)();for(let i=0;i<r;i++){const e=i*(2*Math.PI/r);(0,o.h)(M,m,Math.sin(e)),(0,o.h)(D,x,Math.cos(e)),(0,o.g)(M,M,D),C[3*i]=M[0],C[3*i+1]=M[1],C[3*i+2]=M[2],(0,o.h)(M,M,n),(0,o.g)(M,M,v),y[3*i]=M[0],y[3*i+1]=M[1],y[3*i+2]=M[2],P[2*i]=i/r,P[2*i+1]=0,y[3*(i+r)]=y[3*i]+h[0],y[3*(i+r)+1]=y[3*i+1]+h[1],y[3*(i+r)+2]=y[3*i+2]+h[2],P[2*(i+r)]=i/r,P[2*i+1]=1;const t=(i+1)%r;z(O++,i,i),z(O++,i+r,i),z(O++,t,t),z(O++,t,t),z(O++,i+r,i),z(O++,t+r,t)}if(c){for(let e=0;e<r;e++){const t=(e+1)%r;z(O++,w-2,b-2),z(O++,e,b-2),z(O++,t,b-2)}for(let e=0;e<r;e++){const t=(e+1)%r;z(O++,e+r,b-1),z(O++,w-1,b-1),z(O++,t+r,b-1)}}const V=[["position",new p.n(y,A,3,!0)],["normal",new p.n(C,S,3,!0)],["uv0",new p.n(P,A,2,!0)]];return new g.V(e,V)}function ne(e,t,n,o,i,r){o=o||10,i=null==i||i,(0,m.vA)(t.length>1);const a=[],s=[];for(let l=0;l<o;l++){a.push([0,-l-1,-(l+1)%o-1]);const e=l/o*2*Math.PI;s.push([Math.cos(e)*n,Math.sin(e)*n])}return oe(e,s,t,[[0,0,0]],a,i,r)}function oe(e,t,n,a,l,f){let d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:(0,i.fA)(0,0,0);const h=t.length,v=(0,s.oe)(n.length*h*3+(6*a.length||0)),m=(0,s.oe)(n.length*h*3+(a?6:0)),x=new Array,w=new Array;let b=0,y=0;const C=(0,r.vt)(),P=(0,r.vt)(),A=(0,r.vt)(),S=(0,r.vt)(),z=(0,r.vt)(),O=(0,r.vt)(),M=(0,r.vt)(),D=(0,r.vt)(),V=(0,r.vt)(),H=(0,r.vt)(),F=(0,r.vt)(),T=(0,r.vt)(),j=(0,r.vt)(),R=(0,c.vt)();(0,o.j)(V,0,1,0),(0,o.e)(P,n[1],n[0]),(0,o.n)(P,P),f?((0,o.g)(D,n[0],d),(0,o.n)(A,D)):(0,o.j)(A,0,0,1),ce(P,A,V,V,z,A,ue),(0,o.d)(S,A),(0,o.d)(T,z);for(let i=0;i<a.length;i++)(0,o.h)(O,z,a[i][0]),(0,o.h)(D,A,a[i][2]),(0,o.g)(O,O,D),(0,o.g)(O,O,n[0]),v[b++]=O[0],v[b++]=O[1],v[b++]=O[2];m[y++]=-P[0],m[y++]=-P[1],m[y++]=-P[2];for(let o=0;o<l.length;o++)x.push(l[o][0]>0?l[o][0]:-l[o][0]-1+a.length),x.push(l[o][1]>0?l[o][1]:-l[o][1]-1+a.length),x.push(l[o][2]>0?l[o][2]:-l[o][2]-1+a.length),w.push(0),w.push(0),w.push(0);let E=a.length;const _=a.length-1;for(let i=0;i<n.length;i++){let e=!1;i>0&&((0,o.d)(C,P),i<n.length-1?((0,o.e)(P,n[i+1],n[i]),(0,o.n)(P,P)):e=!0,(0,o.g)(H,C,P),(0,o.n)(H,H),(0,o.g)(F,n[i-1],S),(0,c.O_)(n[i],H,R),(0,c.Ui)(R,(0,u.LV)(F,C),D)?((0,o.e)(D,D,n[i]),(0,o.n)(A,D),(0,o.i)(z,H,A),(0,o.n)(z,z)):ce(H,S,T,V,z,A,ue),(0,o.d)(S,A),(0,o.d)(T,z)),f&&((0,o.g)(D,n[i],d),(0,o.n)(j,D));for(let r=0;r<h;r++)if((0,o.h)(O,z,t[r][0]),(0,o.h)(D,A,t[r][1]),(0,o.g)(O,O,D),(0,o.n)(M,O),m[y++]=M[0],m[y++]=M[1],m[y++]=M[2],(0,o.g)(O,O,n[i]),v[b++]=O[0],v[b++]=O[1],v[b++]=O[2],!e){const e=(r+1)%h;x.push(E+r),x.push(E+h+r),x.push(E+e),x.push(E+e),x.push(E+h+r),x.push(E+h+e);for(let t=0;t<6;t++){const e=x.length-6;w.push(x[e+t]-_)}}E+=h}const I=n[n.length-1];for(let i=0;i<a.length;i++)(0,o.h)(O,z,a[i][0]),(0,o.h)(D,A,a[i][1]),(0,o.g)(O,O,D),(0,o.g)(O,O,I),v[b++]=O[0],v[b++]=O[1],v[b++]=O[2];const U=y/3;m[y++]=P[0],m[y++]=P[1],m[y++]=P[2];const $=E-h;for(let o=0;o<l.length;o++)x.push(l[o][0]>=0?E+l[o][0]:-l[o][0]-1+$),x.push(l[o][2]>=0?E+l[o][2]:-l[o][2]-1+$),x.push(l[o][1]>=0?E+l[o][1]:-l[o][1]-1+$),w.push(U),w.push(U),w.push(U);const B=[["position",new p.n(v,x,3,!0)],["normal",new p.n(m,w,3,!0)]];return new g.V(e,B)}function ie(e,t,n,o,i){const r=(0,a.jh)(3*t.length),c=new Array(2*(t.length-1));let u=0,d=0;for(let a=0;a<t.length;a++){for(let e=0;e<3;e++)r[u++]=t[a][e];a>0&&(c[d++]=a-1,c[d++]=a)}const h=[["position",new p.n(r,c,3,!0)]];if(n&&n.length===t.length&&3===n[0].length){const e=(0,s.oe)(3*n.length);let o=0;for(let i=0;i<t.length;i++)for(let t=0;t<3;t++)e[o++]=n[i][t];h.push(["normal",new p.n(e,c,3,!0)])}if(o&&h.push(["color",new p.n(o,(0,l.tM)(o.length/4),4)]),i&&i.length===t.length){const e=(0,f.xJ)(i,1);h.push(["timeStamps",new p.n(e,c,f.Uf,!0)])}return new g.V(e,h,null,2)}function re(e,t,n,o,i){let r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;const a=new Array(18),s=[[-n,r,i/2],[o,r,i/2],[0,t+r,i/2],[-n,r,-i/2],[o,r,-i/2],[0,t+r,-i/2]];for(let l=0;l<6;l++)a[3*l]=s[l][0],a[3*l+1]=s[l][1],a[3*l+2]=s[l][2];return new g.V(e,[["position",new p.n(a,[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5],3,!0)]])}function ae(e,t){const n=e.getMutableAttribute("position").data;for(let i=0;i<n.length;i+=3){const e=n[i],r=n[i+1],a=n[i+2];(0,o.j)(fe,e,r,a),(0,o.t)(fe,fe,t),n[i]=fe[0],n[i+1]=fe[1],n[i+2]=fe[2]}}function se(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;const n=e.attributes,o=n.get("position").data,i=n.get("normal").data;if(i){const e=t.getMutableAttribute("normal").data;for(let t=0;t<i.length;t+=3){const n=i[t+1];e[t+1]=-i[t+2],e[t+2]=n}}if(o){const e=t.getMutableAttribute("position").data;for(let t=0;t<o.length;t+=3){const n=o[t+1];e[t+1]=-o[t+2],e[t+2]=n}}}function le(e,t,n,i,r){return!(Math.abs((0,o.f)(t,e))>r)&&((0,o.i)(n,e,t),(0,o.n)(n,n),(0,o.i)(i,n,e),(0,o.n)(i,i),!0)}function ce(e,t,n,o,i,r,a){return le(e,t,i,r,a)||le(e,n,i,r,a)||le(e,o,i,r,a)}const ue=.99619469809,fe=(0,r.vt)()},72900:(e,t,n)=>{n.d(t,{CN:()=>s,I9:()=>f,PY:()=>l,Q_:()=>a,ny:()=>c,sZ:()=>u});n(81806);var o=n(55855),i=n(76632),r=n(93345);const a=128,s=.5,l=(0,o.CN)(s/2,s/2,1-s/2,1-s/2);function c(e){return"cross"===e||"x"===e}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t*s,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const{data:r,parameters:l}=f(e,t,n,o);return new i.g(r,l)}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;return{data:p(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:t*s,arguments.length>3&&void 0!==arguments[3]?arguments[3]:0),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:t,height:t,noUnpackFlip:!0,dataType:r.ld.FLOAT,pixelFormat:6403,internalFormat:r.H0.R16F,reloadable:!0}}}function p(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t*s,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;switch(e){case"circle":default:return function(e,t){const n=e/2-.5;return m(e,v(n,n,t/2))}(t,n);case"square":return function(e,t){return d(e,t,!1)}(t,n);case"cross":return function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return h(e,t,!1,n)}(t,n,o);case"x":return function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return h(e,t,!0,n)}(t,n,o);case"kite":return function(e,t){return d(e,t,!0)}(t,n);case"triangle":return function(e,t){return m(e,g(e/2,t,t/2))}(t,n);case"arrow":return function(e,t){const n=t,o=t/2,i=e/2,r=.8*n,a=v(i,(e-t)/2-r,Math.sqrt(r*r+o*o)),s=g(i,n,o);return m(e,(e,t)=>Math.max(s(e,t),-a(e,t)))}(t,n)}}function d(e,t,n){return n&&(t/=Math.SQRT2),m(e,(o,i)=>{let r=o-.5*e+.25,a=.5*e-i-.75;if(n){const e=(r+a)/Math.SQRT2;a=(a-r)/Math.SQRT2,r=e}return Math.max(Math.abs(r),Math.abs(a))-.5*t})}function h(e,t,n){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;t-=o,n&&(t*=Math.SQRT2);const i=.5*t;return m(e,(t,r)=>{let a,s=t-.5*e,l=.5*e-r-1;if(n){const e=(s+l)/Math.SQRT2;l=(l-s)/Math.SQRT2,s=e}return s=Math.abs(s),l=Math.abs(l),a=s>l?s>i?Math.sqrt((s-i)*(s-i)+l*l):l:l>i?Math.sqrt(s*s+(l-i)*(l-i)):s,a-=o/2,a})}function v(e,t,n){return(o,i)=>{const r=o-e,a=i-t;return Math.sqrt(r*r+a*a)-n}}function g(e,t,n){const o=Math.sqrt(t*t+n*n);return(i,r)=>{const a=Math.abs(i-e)-n,s=r-e+t/2+.75,l=(t*a+n*s)/o,c=-s;return Math.max(l,c)}}function m(e,t){const n=new Float32Array(e*e);for(let o=0;o<e;o++)for(let i=0;i<e;i++)n[i+e*o]=t(i,o)/e;return n}},81284:(e,t,n)=>{function o(e){return"point"===e.type}n.d(t,{v:()=>o})},83755:(e,t,n)=>{function o(){return new Float32Array(3)}function i(e){const t=new Float32Array(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function r(e,t,n){const o=new Float32Array(3);return o[0]=e,o[1]=t,o[2]=n,o}function a(){return o()}function s(){return r(1,1,1)}function l(){return r(1,0,0)}function c(){return r(0,1,0)}function u(){return r(0,0,1)}n.d(t,{fA:()=>r,o8:()=>i,vt:()=>o});const f=a(),p=s(),d=l(),h=c(),v=u();Object.freeze(Object.defineProperty({__proto__:null,ONES:p,UNIT_X:d,UNIT_Y:h,UNIT_Z:v,ZEROS:f,clone:i,create:o,fromValues:r,ones:s,unitX:l,unitY:c,unitZ:u,zeros:a},Symbol.toStringTag,{value:"Module"}))},84248:(e,t,n)=>{n.d(t,{R:()=>Y});var o=n(15941),i=n(86300),r=n(44680),a=n(34761),s=n(13191),l=n(19555),c=n(72745),u=n(20664),f=n(9392),p=n(55855);function d(e){return function(e){return e instanceof Float32Array&&e.length>=16}(e)||function(e){return Array.isArray(e)&&e.length>=16}(e)}var h=n(2413),v=n(88105),g=n(63048),m=n(22955),x=n(34981),w=n(40318),b=n(75803),y=n(45463),C=n(12028),P=n(86994),A=n(52757),S=n(99362),z=n(19061),O=n(57481),M=n(48549),D=n(16506),V=n(59246),H=n(61785),F=n(60322),T=n(93345),j=n(57162),R=n(75757);class E extends V.w{constructor(e,t){super(e,t,new D.$(z.H,()=>n.e(271).then(n.bind(n,60271))),(0,R._u)([I,B()].map(O.U))),this.primitiveType=t.occlusionPass?T.WR.POINTS:T.WR.TRIANGLE_STRIP}initializePipeline(e){const{oitPass:t,hasPolygonOffset:n,draped:o,output:i,depthTestEnabled:r,occlusionPass:a}=e,s=r&&!o&&!(1===t)&&!a&&!(9===i);return(0,j.Ey)({blending:(0,x.RN)(i)?(0,F.Yf)(t,!0):null,depthTest:r&&!o?{func:515}:null,depthWrite:s?j.Uy:null,drawBuffers:(0,F.m6)(t,i),colorWrite:j.kn,polygonOffset:n?_:null})}}const _={factor:0,units:-4},I=(0,M.BP)().vec2u8("uv0",{glNormalized:!0}),U=(0,M.BP)().vec3f("position").vec3f("normal").vec4i16("uvi").vec4u8("color").vec2f("size").f32("rotation").vec4f("centerOffsetAndDistance").vec4f("featureAttribute"),$=U.clone().vec4u8("olidColor");function B(){return(0,H.E)()?$:U}var W=n(6326),G=n(6485),N=n(92656);class q extends N.E{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1}}(0,W.Cg)([(0,G.W)()],q.prototype,"screenCenterOffsetUnitsEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"occlusionTestEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"signedDistanceFieldEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasVVSize",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasVVColor",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasVerticalOffset",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasScreenSizePerspective",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasRotation",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"debugDrawLabelBorder",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"hasPolygonOffset",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"depthTestEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"pixelSnappingEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"draped",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"terrainDepthTest",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"cullAboveTerrain",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"occlusionPass",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"occludedFragmentFade",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"horizonCullingEnabled",void 0),(0,W.Cg)([(0,G.W)()],q.prototype,"isFocused",void 0);var L=n(75569);class Y extends y.i{constructor(e,t){super(e,me),this.produces=new Map([[13,e=>(0,x.Mb)(e)&&!this.parameters.drawAsLabel],[14,e=>(0,x.Mb)(e)&&this.parameters.drawAsLabel],[12,()=>this.parameters.occlusionTest],[18,e=>this.parameters.draped&&(0,x.Mb)(e)]]),this._visible=!0,this._configuration=new q(t)}getConfiguration(e,t){const n=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled="screen"===this.parameters.centerOffsetUnits,this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=n,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=12===t.slot,this._configuration.occludedFragmentFade=!n&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||12===t.slot,(0,x.RN)(e)&&(this._configuration.debugDrawLabelBorder=!!m.b.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,n,o,r,s){const{options:{selectionMode:l,hud:c,excludeLabels:d},point:h,camera:v}=n,{parameters:g}=this;if(!l||!c||d&&g.isLabel||!e.visible||!h||!v)return;const m=e.attributes.get("featureAttribute"),x=null==m?null:(0,p.ci)(m.data,fe),{scaleX:w,scaleY:b}=we(x,g,v.pixelRatio);(0,i.z0)(re,t),e.attributes.has("featureAttribute")&&function(e){const t=e[0],n=e[1],o=e[2],i=e[3],r=e[4],a=e[5],s=e[6],l=e[7],c=e[8],u=1/Math.sqrt(t*t+n*n+o*o),f=1/Math.sqrt(i*i+r*r+a*a),p=1/Math.sqrt(s*s+l*l+c*c);e[0]=t*u,e[1]=n*u,e[2]=o*u,e[3]=i*f,e[4]=r*f,e[5]=a*f,e[6]=s*p,e[7]=l*p,e[8]=c*p}(re);const y=e.attributes.get("position"),C=e.attributes.get("size"),A=e.attributes.get("normal"),S=e.attributes.get("rotation"),O=e.attributes.get("centerOffsetAndDistance");(0,P.vA)(y.size>=3);const M=(0,z.c)(g),D="screen"===this.parameters.centerOffsetUnits;for(let i=0;i<y.data.length/y.size;i++){const e=i*y.size;(0,u.j)(J,y.data[e],y.data[e+1],y.data[e+2]),(0,u.t)(J,J,t),(0,u.t)(J,J,v.viewMatrix);const o=i*O.size;if((0,u.j)(ce,O.data[o],O.data[o+1],O.data[o+2]),!D&&(J[0]+=ce[0],J[1]+=ce[1],0!==ce[2])){const e=ce[2];(0,u.n)(ce,J),(0,u.e)(J,J,(0,u.h)(ce,ce,e))}const r=i*A.size;if((0,u.j)(K,A.data[r],A.data[r+1],A.data[r+2]),k(K,re,v,pe),be(this.parameters,J,pe,v,X),v.applyProjection(J,ee),ee[0]>-1){D&&(ce[0]||ce[1])&&(ee[0]+=ce[0]*v.pixelRatio,0!==ce[1]&&(ee[1]+=X.alignmentEvaluator.apply(ce[1])*v.pixelRatio),v.unapplyProjection(ee,J)),ee[0]+=this.parameters.screenOffset[0]*v.pixelRatio,ee[1]+=this.parameters.screenOffset[1]*v.pixelRatio,ee[0]=Math.floor(ee[0]),ee[1]=Math.floor(ee[1]);const e=i*C.size;ve[0]=C.data[e],ve[1]=C.data[e+1],X.evaluator.applyVec2(ve,ve);const t=de*v.pixelRatio;let o=0;g.textureIsSignedDistanceField&&(o=Math.min(g.outlineSize,.5*ve[0])*v.pixelRatio/2),ve[0]*=w,ve[1]*=b;const r=i*S.size,l=g.rotation+S.data[r];if(Z(h,ee[0],ee[1],ve,t,o,l,g,M)){const e=n.ray;if((0,u.t)(ne,J,(0,a.B8)(se,v.viewMatrix)),ee[0]=h[0],ee[1]=h[1],v.unprojectFromRenderScreen(ee,J)){const t=(0,f.vt)();(0,u.d)(t,e.direction);const n=1/(0,u.b)(t);(0,u.h)(t,t,n),s((0,u.k)(e.origin,J)*n,t,-1,ne)}}}}}intersectDraped(e,t,n,o,i){const r=e.attributes.get("position"),a=e.attributes.get("size"),s=e.attributes.get("rotation"),l=this.parameters,c=(0,z.c)(l),u=e.attributes.get("featureAttribute"),f=null==u?null:(0,p.ci)(u.data,fe),{scaleX:d,scaleY:h}=we(f,l,e.screenToWorldRatio),v=he*e.screenToWorldRatio;for(let p=0;p<r.data.length/r.size;p++){const t=p*r.size,u=r.data[t],f=r.data[t+1],g=p*a.size;ve[0]=a.data[g],ve[1]=a.data[g+1];let m=0;l.textureIsSignedDistanceField&&(m=Math.min(l.outlineSize,.5*ve[0])*e.screenToWorldRatio/2),ve[0]*=d,ve[1]*=h;const x=p*s.size,w=l.rotation+s.data[x];Z(n,u,f,ve,v,m,w,l,c)&&o(i.distance,i.normal,-1)}}createBufferWriter(){return new xe}applyShaderOffsetsView(e,t,n,o,i,r,a){const s=k(t,n,i,pe);return this._applyVerticalGroundOffsetView(e,s,i,a),be(this.parameters,a,s,i,r),this._applyPolygonOffsetView(a,s,o[3],i,a),this._applyCenterOffsetView(a,o,a),a}applyShaderOffsetsNDC(e,t,n,o,i){return this._applyCenterOffsetNDC(e,t,n,o),null!=i&&(0,u.d)(i,o),this._applyPolygonOffsetNDC(o,t,n,o),o}_applyPolygonOffsetView(e,t,n,i,r){const a=i.aboveGround?1:-1;let s=Math.sign(n);0===s&&(s=a);const l=a*s;if(this.parameters.shaderPolygonOffset<=0)return(0,u.d)(r,e);const c=(0,o.qE)(Math.abs(t.cosAngle),.01,1),f=1-Math.sqrt(1-c*c)/c/i.viewport[2];return(0,u.h)(r,e,l>0?f:1/f),r}_applyVerticalGroundOffsetView(e,t,n,o){const i=(0,u.b)(e),r=n.aboveGround?1:-1,a=n.computeRenderPixelSizeAtDist(i)*w.R,s=(0,u.h)(J,t.normal,r*a);return(0,u.g)(o,e,s),o}_applyCenterOffsetView(e,t,n){const o="screen"!==this.parameters.centerOffsetUnits;return n!==e&&(0,u.d)(n,e),o&&(n[0]+=t[0],n[1]+=t[1],t[2]&&((0,u.n)(K,n),(0,u.a)(n,n,(0,u.h)(K,K,t[2])))),n}_applyCenterOffsetNDC(e,t,n,o){const i="screen"!==this.parameters.centerOffsetUnits;return o!==e&&(0,u.d)(o,e),i||(o[0]+=t[0]/n.fullWidth*2,o[1]+=t[1]/n.fullHeight*2),o}_applyPolygonOffsetNDC(e,t,n,o){const i=this.parameters.shaderPolygonOffset;if(e!==o&&(0,u.d)(o,e),i){const e=n.aboveGround?1:-1,r=e*Math.sign(t[3]);o[2]-=(r||e)*i}return o}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:n}=this.parameters,o=e[3]>=L.Q||t>=L.Q&&n[3]>=L.Q;return this._visible&&o}createGLMaterial(e){return new Q(e)}calculateRelativeScreenBounds(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:(0,h.vt)();return function(e,t,n,o){o[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*n,o[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*n}(this.parameters,e,t,n),n[2]=n[0]+e[0],n[3]=n[1]+e[1],n}}class Q extends b.m8{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(E,e)}}function k(e,t,n,o){return d(t)&&(t=(0,i.z0)(ae,t)),(0,u.o)(o.normal,e,t),(0,u.t)(o.normal,o.normal,n.viewInverseTransposeMatrix),o.cosAngle=(0,u.f)(te,ge),o}function Z(e,t,n,i,r,a,s,c,u){let f=t-r-i[0]*u[0],p=f+i[0]+2*r,d=n-r-i[1]*u[1],h=d+i[1]+2*r;const v=c.distanceFieldBoundingBox;return c.textureIsSignedDistanceField&&null!=v&&(f+=i[0]*v[0],d+=i[1]*v[1],p-=i[0]*(1-v[2]),h-=i[1]*(1-v[3]),f-=a,p+=a,d-=a,h+=a),(0,l.hZ)(ie,t,n),(0,l.e$)(oe,e,ie,(0,o.kU)(s)),oe[0]>f&&oe[0]<p&&oe[1]>d&&oe[1]<h}const X=new C.fc,J=(0,f.vt)(),K=(0,f.vt)(),ee=(0,p.vt)(),te=(0,f.vt)(),ne=(0,f.vt)(),oe=(0,c.vt)(),ie=(0,c.vt)(),re=(0,r.vt)(),ae=(0,r.vt)(),se=(0,s.vt)(),le=(0,p.vt)(),ce=(0,f.vt)(),ue=(0,f.vt)(),fe=(0,p.vt)(),pe={normal:te,cosAngle:0},de=1,he=2,ve=(0,c.fA)(0,0),ge=(0,f.fA)(0,0,1);class me extends b.NV{constructor(){super(...arguments),this.renderOccluded=1,this.isDecoration=!1,this.color=(0,p.CN)(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=(0,c.fA)(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=(0,p.CN)(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=(0,p.vt)(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class xe{constructor(){this.layout=I,this.instanceLayout=B()}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,t,n,o,i,r){const{position:a,normal:s,color:l,size:c,rotation:u,centerOffsetAndDistance:f,featureAttribute:p,uvi:d}=i;(0,A.Hk)(n.get("position"),e,a,r),(0,A.p1)(n.get("normal"),t,s,r);const h=n.get("position").indices.length;let g=0,m=0,x=z.f,w=z.f;const b=n.get("uvi")?.data;b&&b.length>=4&&(g=b[0],m=b[1],x=b[2],w=b[3]);for(let v=0;v<h;++v){const e=r+v;d.setValues(e,g,m,x,w)}if((0,A.tb)(n.get("color"),4,l,r),(0,A.Ue)(n.get("size"),c,r),(0,A.uO)(n.get("rotation"),u,r),n.get("centerOffsetAndDistance")?(0,A.Ut)(n.get("centerOffsetAndDistance"),f,r):(0,A.Pq)(f,r,h),n.get("featureAttribute")?(0,A.Ut)(n.get("featureAttribute"),p,r):(0,A.Pq)(p,r,h),null!=o){const e=n.get("position")?.indices;if(e){const t=e.length,n=i.getField("olidColor",v.XP);(0,A.vx)(o,n,t,r)}}return{numVerticesPerItem:1,numItems:h}}writeBaseInstance(e,t){const{uv0:n}=t;(0,A.Ue)(e.get("uv0"),n,0)}intersect(e,t,n,o,i,r,s){const{options:{selectionMode:l,hud:c,excludeLabels:p},point:d,camera:h}=o;if(!l||!c||p&&t.isLabel||!d)return;const v=this.instanceLayout.createView(e),{position:g,normal:m,rotation:x,size:w,featureAttribute:b,centerOffsetAndDistance:y}=v,C="screen"===t.centerOffsetUnits,P=(0,z.c)(t);if(null==g||null==m||null==x||null==w||null==y||null==h)return;const A=null==b?null:b.getVec(0,fe),{scaleX:S,scaleY:O}=we(A,t,h.pixelRatio),M=g.count;for(let z=0;z<M;z++){if(g.getVec(z,J),null!=n&&(0,u.g)(J,J,n),(0,u.t)(J,J,h.viewMatrix),y.getVec(z,le),(0,u.j)(ce,le[0],le[1],le[2]),!C&&(J[0]+=ce[0],J[1]+=ce[1],0!==ce[2])){const e=ce[2];(0,u.n)(ce,J),(0,u.e)(J,J,(0,u.h)(ce,ce,e))}if(m.getVec(z,K),k(K,re,h,pe),be(t,J,pe,h,X),h.applyProjection(J,ee),ee[0]>-1){C&&(ce[0]||ce[1])&&(ee[0]+=ce[0]*h.pixelRatio,0!==ce[1]&&(ee[1]+=X.alignmentEvaluator.apply(ce[1])*h.pixelRatio),h.unapplyProjection(ee,J)),ee[0]+=t.screenOffset[0]*h.pixelRatio,ee[1]+=t.screenOffset[1]*h.pixelRatio,ee[0]=Math.floor(ee[0]),ee[1]=Math.floor(ee[1]),w.getVec(z,ve),X.evaluator.applyVec2(ve,ve);const e=de*h.pixelRatio;let n=0;t.textureIsSignedDistanceField&&(n=Math.min(t.outlineSize,.5*ve[0])*h.pixelRatio/2),ve[0]*=S,ve[1]*=O;const i=x.get(z),r=t.rotation+i;if(Z(d,ee[0],ee[1],ve,e,n,r,t,P)){const e=o.ray;if((0,u.t)(ne,J,(0,a.B8)(se,h.viewMatrix)),ee[0]=d[0],ee[1]=d[1],h.unprojectFromRenderScreen(ee,J)){const t=(0,f.vt)();(0,u.d)(t,e.direction);const n=1/(0,u.b)(t);(0,u.h)(t,t,n),s((0,u.k)(e.origin,J)*n,t,z,ne)}}}}}}function we(e,t,n){return null==e||null==t.vvSize?{scaleX:n,scaleY:n}:((0,g.VC)(ue,t,e),{scaleX:ue[0]*n,scaleY:ue[1]*n})}function be(e,t,n,o,i){if(!e.verticalOffset?.screenLength){const o=(0,u.b)(t);return i.update(n.cosAngle,o,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),t}const r=(0,u.b)(t),a=e.screenSizePerspectiveAlignment??e.screenSizePerspective,s=(0,S.kE)(o,r,e.verticalOffset,n.cosAngle,a,e.screenSizePerspectiveMinPixelReferenceSize);return i.update(n.cosAngle,r,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),(0,u.h)(n.normal,n.normal,s),(0,u.g)(t,t,n.normal)}},94587:(e,t,n)=>{n.d(t,{fY:()=>r});var o=n(78393),i=n(62984);function r(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e<=o.y9?t?new Array(e).fill(0):new Array(e):(0,i.Bg)(e)}},98720:(e,t,n)=>{n.d(t,{K:()=>r});var o=n(67582),i=n(86955);function r(e){e.uniforms.add(new o.o("alignPixelEnabled",e=>e.alignPixelEnabled)),e.code.add(i.H`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(i.H`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}}}]);
//# sourceMappingURL=3804.5ff09885.chunk.js.map