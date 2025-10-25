"use strict";(self.webpackChunkn2_trees=self.webpackChunkn2_trees||[]).push([[3823,4e3],{2466:(e,t,i)=>{i.d(t,{Q:()=>l});var n=i(43047),r=i(55855),o=i(58350),s=i(21390),a=i(86955);function l(e,t){if(!t.hasAnimation)return;const{attributes:i,varyings:r,vertex:l,fragment:d}=e;i.add("timeStamps","vec4"),r.add("vTimeStamp","float"),r.add("vFirstTime","float"),r.add("vLastTime","float"),r.add("vTransitionType","float"),l.main.add(a.H`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`);const{animation:h}=t;3===h&&d.constants.add("decayRate","float",2.3),d.code.add(a.H`
    float getTrailOpacity(float x) {
      ${function(e){switch(e){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return"float cutOff = exp(-decayRate);\n        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);";default:return"return 1.0;"}}(h)}
    }`),d.uniforms.add(new s.m("timeElapsed",e=>e.timeElapsed),new s.m("trailLength",e=>e.trailLength),new s.m("speed",e=>e.animationSpeed),new o.E("timingOptions",e=>(0,n.s)(c,e.startTime,e.endTime,e.fadeInTime,e.fadeOutTime))),d.code.add(a.H`float fadeIn(float x) {
return smoothstep(0.0, timingOptions[2], x);
}
float fadeOut(float x) {
return isinf(timingOptions[3]) ? 1.0 : smoothstep(timingOptions[3], 0.0, x);
}`),d.code.add(a.H`vec4 animate(vec4 color) {
float startTime = timingOptions[0];
float endTime = timingOptions[1];
float totalTime = vLastTime - vFirstTime;
float actualEndTime = int(vTransitionType) == 2 ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
animatedColor.a *= getTrailOpacity((totalTime - (vTimeStamp - vFirstTime)) / trailLength);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= fadeIn(timeElapsed - startTime);
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTime);
float vHeadRelativeToFirst = mod((timeElapsed - relativeStartTime) * speed - vFirstTime, totalTime);
float vRelativeToHead = vHeadRelativeToFirst + vFirstTime - vTimeStamp;
bool inPreviousCycle = vRelativeToHead < 0.0;
vRelativeToHead += inPreviousCycle ? totalTime : 0.0;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (vAbsoluteTime > actualEndTime) {
vRelativeToHead = (timeElapsed - relativeStartTime) * speed - vTimeStamp;
vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
}
animatedColor *= step(startTime, vAbsoluteTime);
animatedColor *= step(vAbsoluteTime, actualEndTime);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= inPreviousCycle ? fadeOut(vHeadRelativeToFirst / speed) : 1.0;
animatedColor.a *= getTrailOpacity(vRelativeToHead / trailLength);
animatedColor.a *= int(vTransitionType) == 0 ? fadeIn(vAbsoluteTime - startTime) : 1.0;
animatedColor.a *= fadeIn(vTimeStamp - vFirstTime);
return animatedColor;
}`)}const c=(0,r.vt)()},3838:(e,t,i)=>{i.d(t,{s:()=>f});var n=i(34761),r=i(13191),o=i(66763),s=i(69817),a=i(3799),l=i(5517),c=i(21390),d=i(60205),h=i(86955),p=i(12216);const u=8;function f(e,t){const{vertex:i,attributes:r}=e;i.uniforms.add(new c.m("intrinsicWidth",e=>e.width));const{hasScreenSizePerspective:f,spherical:v}=t;f?(e.include(s.Y6,t),(0,s.pM)(i),(0,a.yu)(i,t),i.uniforms.add(new p.S("inverseViewMatrix",(e,t)=>(0,n.B8)(m,(0,n.Tl)(m,t.camera.viewMatrix,e.origin)))),i.code.add(h.H`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${v?h.H`normalize(worldPos + localOrigin)`:h.H`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):i.code.add(h.H`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),t.hasVVSize?(r.add("sizeFeatureAttribute","float"),i.uniforms.add(new l.t("vvSizeMinSize",e=>e.vvSize.minSize),new l.t("vvSizeMaxSize",e=>e.vvSize.maxSize),new l.t("vvSizeOffset",e=>e.vvSize.offset),new l.t("vvSizeFactor",e=>e.vvSize.factor),new l.t("vvSizeFallback",e=>e.vvSize.fallback)),i.code.add(h.H`
    float getSize(${(0,h.If)(f,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${(0,h.If)(f,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(r.add("size","float"),i.code.add(h.H`
    float getSize(${(0,h.If)(f,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${(0,h.If)(f,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),t.hasVVOpacity?(r.add("opacityFeatureAttribute","float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new d.x("vvOpacityValues",e=>e.vvOpacity.values,u),new d.x("vvOpacityOpacities",e=>e.vvOpacity.opacityValues,u),new c.m("vvOpacityFallback",e=>e.vvOpacity.fallback,{supportsNaN:!0})),i.code.add(h.H`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${(0,h.If)(t.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):i.code.add(h.H`vec4 applyOpacity(vec4 color) {
return color;
}`),t.hasVVColor?(e.include(o.A,t),r.add("colorFeatureAttribute","float"),i.code.add(h.H`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(r.add("color","vec4"),i.code.add(h.H`vec4 getColor() {
return applyOpacity(color);
}`))}const m=(0,r.vt)()},8918:(e,t,i)=>{i.d(t,{x:()=>h});var n=i(18690),r=i(4212),o=i(54099),s=i(88321),a=(i(81806),i(30726)),l=i(90632);const c=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];var d=i(94536);class h{constructor(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";this.stage=e,this.apiLayerViewUid=i,this.id=(0,l.c)(),this.events=new o.bk,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Array,this._handles=new s.A,this._objects=new Map,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??0,e.addLayer(this);for(const n of c)this._handles.add(this.events.on(n,t=>e.handleEvent(n,t)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(e){return(0,r.zI)(this._objects.get(e))}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.set(e.id,e),e.layer=this,this.events.emit("layerObjectAdded",e),null!=this._octree&&this._objectsAdded.push(e)}remove(e){this._objects.delete(e.id)&&(this.events.emit("layerObjectRemoved",e),e.layer=null,null!=this._octree&&((0,n.Xy)(this._objectsAdded,e)||this._octree.remove([e])))}addMany(e){for(const t of e)this._objects.set(t.id,t),t.layer=this;this.events.emit("layerObjectsAdded",e),null!=this._octree&&this._objectsAdded.push(...e)}removeMany(e){const t=new Array;for(const i of e)this._objects.delete(i.id)&&t.push(i);if(0!==t.length&&(this.events.emit("layerObjectsRemoved",t),t.forEach(e=>e.layer=null),null!=this._octree)){for(let e=0;e<t.length;)(0,n.Xy)(this._objectsAdded,t[e])?(t[e]=t[t.length-1],t.length-=1):++e;this._octree.remove(t)}}commit(){this.stage.commitLayer(this)}sync(){1!==this.updatePolicy&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){null==this._octree||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return null==this._octree&&this._objects.size>50?(this._octree=new d.x(e=>e.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.values())):null!=this._octree&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=(0,a.pR)(this._octree),this._objectsAdded.length=0}get test(){}}},14623:(e,t,i)=>{i.d(t,{R:()=>O,b:()=>C,r:()=>z});var n=i(26917),r=i(90080),o=i(3838),s=i(56906),a=i(17698),l=i(36324),c=i(94192),d=i(80883),h=i(20179),p=i(3799),u=i(28450),f=i(51596),m=i(58350),v=i(23148),g=i(21390),S=i(86955),_=i(23687),b=i(2466),x=i(91911),y=i(2687),T=i(75569);const z=1;function C(e){const t=new y.N5,{attributes:i,varyings:C,vertex:O,fragment:A}=t,{applyMarkerOffset:P,draped:w,output:D,capType:R,stippleEnabled:E,falloffEnabled:L,roundJoins:W,wireframe:j,innerColorEnabled:F,hasAnimation:V,hasScreenSizePerspective:M}=e;A.include(l.p),t.include(o.s,e),t.include(s.q,e),t.include(r.g,e),t.include(c.Z,e),t.include(b.Q,e);const H=P&&!w;H&&(O.uniforms.add(new g.m("markerScale",e=>e.markerScale)),t.include(a.r,{space:2,hasScreenSizePerspective:M})),(0,p.NB)(O,e),O.uniforms.add(new _.F("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new u.E("nearFar",e=>e.camera.nearFar),new g.m("miterLimit",e=>"miter"!==e.join?0:e.miterLimit),new f.I("viewport",e=>e.camera.fullViewport)),O.constants.add("LARGE_HALF_FLOAT","float",65500),i.add("position","vec3"),i.add("previousDelta","vec4"),i.add("nextDelta","vec4"),i.add("lineParameters","vec2"),i.add("u0","float"),C.add("vColor","vec4"),C.add("vpos","vec3",{invariant:!0}),C.add("vLineDistance","float"),C.add("vLineWidth","float");const I=E;I&&C.add("vLineSizeInv","float");const N=2===R,k=E&&N,B=L||k;B&&C.add("vLineDistanceNorm","float"),N&&(C.add("vSegmentSDF","float"),C.add("vReverseSegmentSDF","float")),O.code.add(S.H`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),O.code.add(S.H`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),O.code.add(S.H`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),(0,p.Nz)(O),O.constants.add("aaWidth","float",E?0:1).main.add(S.H`bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;
float coverage = 1.0;
if (lineParameters.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
vec4 pos  = view * vec4(position, 1.0);
vec4 prev = view * vec4(prevPosition, 1.0);
vec4 next = view * vec4(nextPosition, 1.0);
bool isJoin = abs(lineParameters.y) < 3.0;`),H&&O.main.add(S.H`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(h.F),O.main.add(S.H`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${(0,S.If)(M,"clippedPos")});
      ${(0,S.If)(E&&M,"float patternLineSize = getSize(clippedCenter);")}
      ${(0,S.If)(E&&!M,"float patternLineSize = lineSize;")}

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${I?S.H`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(E||N)&&O.main.add(S.H`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${N?S.H`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),O.main.add(S.H`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),W?O.main.add(S.H`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${E?S.H`min(1.0, subdivisionFactor * ${S.H.float((z+2)/(z+1))})`:S.H`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):O.main.add(S.H`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const U=0!==R;return O.main.add(S.H`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${U?S.H`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),O.main.add(S.H`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${B?S.H`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),N&&O.main.add(S.H`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),E&&(w?O.uniforms.add(new v.U("worldToScreenRatio",e=>1/e.screenToPCSRatio)):O.main.add(S.H`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),O.main.add(S.H`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),w?O.main.add(S.H`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):O.main.add(S.H`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),O.uniforms.add(new g.m("stipplePatternPixelSize",e=>(0,s.h)(e))),O.main.add(S.H`float patternLength = patternLineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),O.main.add(S.H`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${j&&!w?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(n.HQ,e),t.include(x.z,e),A.include(d.a),A.main.add(S.H`discardBySlice(vpos);
discardByTerrainDepth();`),t.include(h.m),A.main.add(S.H`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${(0,S.If)(B,S.H`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),j?A.main.add(S.H`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(N&&A.main.add(S.H`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${S.H.float(T.Q)}) {
          discard;
        }
      `),k?A.main.add(S.H`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${S.H.float(T.Q)}, stippleCoverage);
      `):A.main.add(S.H`float stippleAlpha = getStippleAlpha(lineWidth);`),10!==D&&A.main.add(S.H`discardByStippleAlpha(stippleAlpha, ${S.H.float(T.Q)});`),t.include(h.m),A.uniforms.add(new m.E("intrinsicColor",e=>e.color)).main.add(S.H`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),F&&A.uniforms.add(new m.E("innerColor",e=>e.innerColor??e.color),new g.m("innerWidth",(e,t)=>e.innerWidth*t.camera.pixelRatio)).main.add(S.H`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),A.main.add(S.H`vec4 finalColor = blendStipple(color, stippleAlpha);`),L&&(A.uniforms.add(new g.m("falloff",e=>e.falloff)),A.main.add(S.H`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),E||A.main.add(S.H`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),V&&A.main.add(S.H`
        finalColor = animate(finalColor);

        ${(0,S.If)(10!==D,S.H`
            if (finalColor.a <= ${S.H.float(T.Q)}) {
              discard;
            }`)}
      `)),A.main.add(S.H`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}const O=Object.freeze(Object.defineProperty({__proto__:null,build:C,ribbonlineNumRoundJoinSubdivisions:z},Symbol.toStringTag,{value:"Module"}))},17698:(e,t,i)=>{i.d(t,{r:()=>a});var n=i(99443),r=i(3799),o=i(23148),s=i(86955);function a(e,t){const i=e.vertex,a=t.hasScreenSizePerspective;(0,r.Nz)(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",n.PV).code.add(s.H`
  float getLineWidth(${(0,s.If)(a,"vec3 pos")}) {
     return max(getSize(${(0,s.If)(a,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),2===t.space&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new o.U("perRenderPixelRatio",e=>e.camera.perRenderPixelRatio)),i.code.add(s.H`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${(0,s.If)(a,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${(0,s.If)(a,"pos")})) * screenToWorldRatio;
  }
  `))}},20179:(e,t,i)=>{function n(e){e.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function r(e){e.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}i.d(t,{F:()=>n,m:()=>r})},37046:(e,t,i)=>{i.d(t,{B:()=>f});i(81806);var n=i(90632),r=i(34761),o=i(13191),s=i(20664),a=i(9392),l=i(78315),c=i(94966),d=i(35416),h=i(86994),p=i(66470),u=i(68967);class f{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.id=(0,n.c)(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerViewUid=e.layerViewUid,e.isElevationSource&&(this.lastValidElevationBB=new m),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(e){(0,h.vA)(null==this._layer||null==e,"Object3D can only be added to a single Layer"),this._layer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e);for(const t of this._highlightIds)e.addHighlight(t);this._emit("geometryAdded",{object:this,geometry:e}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];if(t){for(const e of this._highlightIds)t.removeHighlight(e);this._emit("geometryRemoved",{object:this,geometry:t}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),(0,p.b)(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const e of this._geometries)e.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new d.p;for(const t of this._geometries)t.occludees=(0,u.Ci)(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=(0,u.PC)(t.occludees,e);this._emit("occlusionChanged",this)}highlight(e){const t=new d.h(e);for(const i of this._geometries)i.addHighlight(t);return this._emit("highlightChanged",this),this._highlightIds.add(t),t}removeHighlight(e){this._highlightIds.delete(e);for(const t of this._geometries)t.removeHighlight(e);this._emit("highlightChanged",this)}removeStateID(e){0===e.channel?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return(0,r.lw)(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,o.vt)();return(0,r.lw)(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new v,this._validateBoundingVolume(this._bvWorldSpace,0)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new v,this._validateBoundingVolume(this._bvObjectSpace,1)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=1===t;for(const n of this._geometries){const t=n.boundingInfo;t&&g(t,e,i?n.transformation:this.getCombinedShaderTransformation(n))}(0,l.o)(e.bounds,(0,s.l)(x,e.min,e.max,.5));for(const n of this._geometries){const t=n.boundingInfo;if(null==t)continue;const r=i?n.transformation:this.getCombinedShaderTransformation(n),o=(0,c.hG)(r);(0,s.t)(x,t.center,r);const a=(0,s.k)(x,(0,l.a)(e.bounds)),d=t.radius*o;e.bounds[3]=Math.max(e.bounds[3],a+d)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&e&&this.layer.notifyObjectBBChanged(this,e)}_emit(e,t){this.layer?.events.emit(e,t)}get geometries(){return this._geometries}get transformation(){return this._transformation??o.zK}set transformation(e){this._transformation=(0,r.C)(this._transformation??(0,o.vt)(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?(0,r.C)(this._shaderTransformation??(0,o.vt)(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}}class m{constructor(){this._data=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]}get min(){return(0,a.fA)(this._data[0],this._data[1],this._data[2])}get max(){return(0,a.fA)(this._data[3],this._data[4],this._data[5])}minWith(e){const{_data:t}=this;t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.min(t[2],e[2])}maxWith(e){const{_data:t}=this;t[3]=Math.max(t[3],e[0]),t[4]=Math.max(t[4],e[1]),t[5]=Math.max(t[5],e[2])}assignMinMax(e,t){for(let i=0;i<3;++i)this._data[0+i]=e[i],this._data[3+i]=t[i]}isEmpty(){return this._data[3]<this._data[0]&&this._data[4]<this._data[1]&&this._data[5]<this._data[2]}}class v extends m{constructor(){super(...arguments),this.bounds=(0,l.c)()}}function g(e,t,i){const n=e.bbMin,o=e.bbMax;if((0,r.tZ)(i)){const e=(0,s.j)(S,i[12],i[13],i[14]);return(0,s.g)(_,n,e),(0,s.g)(b,o,e),t.minWith(_),void t.maxWith(b)}if((0,s.t)(_,n,i),(0,s.q)(n,o))return t.minWith(_),void t.maxWith(_);(0,s.t)(b,o,i),t.minWith(_),t.minWith(b),t.maxWith(_),t.maxWith(b);for(let r=0;r<3;++r)(0,s.d)(_,n),(0,s.d)(b,o),_[r]=o[r],b[r]=n[r],(0,s.t)(_,_,i),(0,s.t)(b,b,i),t.minWith(_),t.minWith(b),t.maxWith(_),t.maxWith(b)}const S=(0,a.vt)(),_=(0,a.vt)(),b=(0,a.vt)(),x=(0,a.vt)()},41595:(e,t,i)=>{i.d(t,{KF:()=>f,MF:()=>u,VG:()=>d,g7:()=>p,gf:()=>h,o8:()=>l,q6:()=>c});var n=i(76460),r=i(50346),o=i(32535),s=i(76386);const a=()=>n.A.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function l(e){return{cachedResult:e.cachedResult,arcade:e.arcade?{func:e.arcade.func,context:e.arcade.modules.arcadeUtils.createExecContext(null,{sr:e.arcade.context.spatialReference}),modules:e.arcade.modules}:null}}async function c(e,t,i,n){const o=e?.expression;if("string"!=typeof o)return null;const a=v(o);if(null!=a)return{cachedResult:a};const l=await(0,s.l)();(0,r.Te)(i);const c=l.arcadeUtils,d=c.createSyntaxTree(o);return c.dependsOnView(d)?(null!=n&&n.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0}):{arcade:{func:c.createFunction(d),context:c.createExecContext(null,{sr:t}),modules:l}}}function d(e,t,i){return e.arcadeUtils.createFeature(t.attributes,t.geometry,i)}function h(e,t){if(null!=e&&!m(e)){if(!t||!e.arcade)return void a().errorOncePerTick("Arcade support required but not provided");const i=t;i._geometry&&(i._geometry=(0,o.wZ)(i._geometry)),e.arcade.modules.arcadeUtils.updateExecContext(e.arcade.context,t)}}function p(e){if(null!=e){if(m(e))return e.cachedResult;const t=e.arcade;let i=t?.modules.arcadeUtils.executeFunction(t.func,t.context);return"number"!=typeof i&&(e.cachedResult=0,i=0),i}return 0}function u(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=e?.featureExpressionInfo;const n=i?.expression;return t||"0"===n||(i=null),i??null}const f={cachedResult:0};function m(e){return null!=e.cachedResult}function v(e){return"0"===e?0:null}},49296:(e,t,i)=>{i.d(t,{F:()=>o});var n=i(81478),r=i(41595);class o{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=(0,n.Ao)(e)}get requiresSampledElevationInfo(){return"absolute-height"!==this.mode}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,t){const i=this.calculateOffsetRenderUnits(t);return null!=this.featureExpressionInfoContext?i:e+i}calculateOffsetRenderUnits(e){let t=this._meterUnitOffset;const i=this.featureExpressionInfoContext;return null!=i&&(t+=(0,r.g7)(i)*this._metersPerElevationInfoUnit),t/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=(0,n.Tg)(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,t,i){e.arcade?(this._featureExpressionInfoContext=(0,r.o8)(e),this.updateFeatureExpressionFeature(t,i)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,t){const i=this.featureExpressionInfoContext;i?.arcade&&(i.cachedResult=void 0,(0,r.gf)(this._featureExpressionInfoContext,e.geometry?(0,r.VG)(i.arcade.modules,e,t):null))}static fromElevationInfo(e){const t=new o;return null!=e&&t.setFromElevationInfo(e),t}}},52479:(e,t,i)=>{i.d(t,{W:()=>M});var n=i(76460),r=i(15941),o=i(76931),s=i(91417),a=i(19555),l=i(20664),c=i(9392),d=i(43047),h=i(55855),p=i(62984),u=i(44230),f=i(13927),m=i(34981),v=i(61785),g=i(59696),S=i(45463),_=i(86994),b=i(93684),x=i(52757),y=i(14623),T=(i(81806),i(48549)),z=i(16506),C=i(59246),O=i(60322),A=i(96643),P=i(93345),w=i(57162);class D extends C.w{constructor(e,t){super(e,t,new z.$(y.R,()=>i.e(1721).then(i.bind(i,61721))),E(t).locations),this.primitiveType=t.wireframe?P.WR.LINES:P.WR.TRIANGLE_STRIP}_makePipelineState(e,t){const{oitPass:i,output:n,hasOccludees:r,hasPolygonOffset:o}=e,s=0===i,a=2===i;return(0,w.Ey)({blending:(0,m.RN)(n)?(0,O.Yf)(i):null,depthTest:{func:(0,O.K_)(i)},depthWrite:(0,O.z5)(e),drawBuffers:(0,C.L)(n,(0,O.m6)(i,n)),colorWrite:w.kn,stencilWrite:r?A.v0:null,stencilTest:r?t?A.a9:A.qh:null,polygonOffset:s||a?o?R:null:O.SE})}initializePipeline(e){if(e.occluder){const t=e.hasPolygonOffset?R:null,{output:i,hasOccludees:n}=e;this._occluderPipelineTransparent=(0,w.Ey)({blending:w.T8,polygonOffset:t,depthTest:A.sf,depthWrite:null,colorWrite:w.kn,stencilWrite:null,stencilTest:n?A.mK:null,drawBuffers:(0,C.L)(i)}),this._occluderPipelineOpaque=(0,w.Ey)({blending:w.T8,polygonOffset:t,depthTest:n?A.sf:A.m,depthWrite:null,colorWrite:w.kn,stencilWrite:n?A.r8:null,stencilTest:n?A.I$:null,drawBuffers:(0,C.L)(i)}),this._occluderPipelineMaskWrite=(0,w.Ey)({blending:null,polygonOffset:t,depthTest:A.m,depthWrite:null,colorWrite:null,stencilWrite:n?A.v0:null,stencilTest:n?A.a9:null,drawBuffers:(0,C.L)(i)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(e)return this._occludeePipeline;switch(t){case 11:return this._occluderPipelineTransparent??super.getPipeline();case 10:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}}const R={factor:0,units:-4};function E(e){const t=(0,T.BP)().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return e.hasVVColor?t.f32("colorFeatureAttribute"):t.vec4u8("color",{glNormalized:!0}),e.hasVVSize?t.f32("sizeFeatureAttribute"):t.f32("size"),e.hasVVOpacity&&t.f32("opacityFeatureAttribute"),(0,v.E)()&&t.vec4u8("olidColor"),e.hasAnimation&&t.vec4f16("timeStamps"),t}var L=i(6326),W=i(6485),j=i(92656);class F extends j.E{constructor(e){super(),this.spherical=e,this.capType=0,this.emissionSource=0,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.animation=2,this.hasScreenSizePerspective=!1,this.textureCoordinateType=0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return 0!==this.animation}}(0,L.Cg)([(0,W.W)({count:3})],F.prototype,"capType",void 0),(0,L.Cg)([(0,W.W)({count:8})],F.prototype,"emissionSource",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasPolygonOffset",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"writeDepth",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"draped",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"stippleEnabled",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"stippleOffColorEnabled",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"stipplePreferContinuous",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"roundJoins",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"applyMarkerOffset",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasVVSize",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasVVColor",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasVVOpacity",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"falloffEnabled",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"innerColorEnabled",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasOccludees",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"occluder",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"terrainDepthTest",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"cullAboveTerrain",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"wireframe",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"discardInvisibleFragments",void 0),(0,L.Cg)([(0,W.W)({count:4})],F.prototype,"animation",void 0),(0,L.Cg)([(0,W.W)()],F.prototype,"hasScreenSizePerspective",void 0);var V=i(75569);class M extends S.i{constructor(e,t){super(e,I),this.produces=new Map([[2,e=>(0,m.CL)(e)||(0,m.RN)(e)&&8===this.parameters.renderOccluded],[3,e=>(0,m.eh)(e)],[10,e=>(0,m.T2)(e)&&8===this.parameters.renderOccluded],[11,e=>(0,m.T2)(e)&&8===this.parameters.renderOccluded],[4,e=>(0,m.RN)(e)&&this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[8,e=>(0,m.RN)(e)&&!this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[18,e=>(0,m.i3)(e)]]),this._configuration=new F(t)}getConfiguration(e,t){super.getConfiguration(e,t,this._configuration),this._configuration.oitPass=t.oitPass,this._configuration.draped=18===t.slot;const i=null!=this.parameters.stipplePattern&&9!==e;return this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&null!=this.parameters.stippleOffColor,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins="round"===this.parameters.join,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=null!=this.parameters.markerParameters&&function(e){return 1===e.anchor&&e.hideOnShortSegments&&"begin-end"===e.placement&&e.worldSpace}(this.parameters.markerParameters),this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&null!=this.parameters.innerColor,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=t.hasOccludees,this._configuration.occluder=8===this.parameters.renderOccluded,this._configuration.terrainDepthTest=t.terrainDepthTest&&(0,m.RN)(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=this.hasEmissions?1:0,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration}get visible(){return this.parameters.color[3]>=V.Q||null!=this.parameters.stipplePattern&&(this.parameters.stippleOffColor?.[3]??0)>V.Q}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectDraped(e,t,i,n,o){let{attributes:s,screenToWorldRatio:a}=e;if(!t.options.selectionMode)return;const l=s.get("size");let c=this.parameters.width;if(this.parameters.vvSize){const e=s.get("sizeFeatureAttribute").data[0];Number.isNaN(e)?c*=this.parameters.vvSize.fallback[0]:c*=(0,r.qE)(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else l&&(c*=l.data[0]);const d=i[0],h=i[1],p=(c/2+4)*a;let u=Number.MAX_VALUE,f=0;const m=s.get("position").data,v=B(this.parameters,s)?m.length-2:m.length-5;for(let g=0;g<v;g+=3){const e=m[g],t=m[g+1],i=(g+3)%m.length,n=d-e,o=h-t,s=m[i]-e,a=m[i+1]-t,l=(0,r.qE)((s*n+a*o)/(s*s+a*a),0,1),c=s*l-n,p=a*l-o,v=c*c+p*p;v<u&&(u=v,f=g/3)}u<p*p&&n(o.distance,o.normal,f)}intersect(e,t,i,o,s,c){const{options:d,camera:h,rayBegin:p,rayEnd:m}=i;if(!d.selectionMode||!e.visible||!h)return;if(!(0,_.zH)(t))return void n.A.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const v=e.attributes,g=v.get("position").data;let S=this.parameters.width;if(this.parameters.vvSize){const e=v.get("sizeFeatureAttribute").data[0];Number.isNaN(e)||(S*=(0,r.qE)(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else v.has("size")&&(S*=v.get("size").data[0]);const b=J;(0,a.C)(b,i.point);const x=S*h.pixelRatio/2+4*h.pixelRatio;(0,l.j)(oe[0],b[0]-x,b[1]+x,0),(0,l.j)(oe[1],b[0]+x,b[1]+x,0),(0,l.j)(oe[2],b[0]+x,b[1]-x,0),(0,l.j)(oe[3],b[0]-x,b[1]-x,0);for(let n=0;n<4;n++)if(!h.unprojectFromRenderScreen(oe[n],se[n]))return;(0,f.Cr)(h.eye,se[0],se[1],ae),(0,f.Cr)(h.eye,se[1],se[2],le),(0,f.Cr)(h.eye,se[2],se[3],ce),(0,f.Cr)(h.eye,se[3],se[0],de);let y=Number.MAX_VALUE,T=0;const z=B(this.parameters,v)?g.length-2:g.length-5;for(let n=0;n<z;n+=3){U[0]=g[n]+t[12],U[1]=g[n+1]+t[13],U[2]=g[n+2]+t[14];const e=(n+3)%g.length;if($[0]=g[e]+t[12],$[1]=g[e+1]+t[13],$[2]=g[e+2]+t[14],(0,f.mN)(ae,U)<0&&(0,f.mN)(ae,$)<0||(0,f.mN)(le,U)<0&&(0,f.mN)(le,$)<0||(0,f.mN)(ce,U)<0&&(0,f.mN)(ce,$)<0||(0,f.mN)(de,U)<0&&(0,f.mN)(de,$)<0)continue;const i=h.projectToRenderScreen(U,Q),r=h.projectToRenderScreen($,X);if(null==i||null==r)continue;if(i[2]<0&&r[2]>0){(0,l.e)(q,U,$);const e=h.frustum,t=-(0,f.mN)(e[4],U)/(0,l.f)(q,(0,f.Qj)(e[4]));if((0,l.h)(q,q,t),(0,l.g)(U,U,q),!h.projectToRenderScreen(U,i))continue}else if(i[2]>0&&r[2]<0){(0,l.e)(q,$,U);const e=h.frustum,t=-(0,f.mN)(e[4],$)/(0,l.f)(q,(0,f.Qj)(e[4]));if((0,l.h)(q,q,t),(0,l.g)($,$,q),!h.projectToRenderScreen($,r))continue}else if(i[2]<0&&r[2]<0)continue;i[2]=0,r[2]=0;const o=(0,u.kb)((0,u.Cr)(i,r,K),b);o<y&&(y=o,(0,l.d)(Y,U),(0,l.d)(Z,$),T=n/3)}if(y<x*x){let e=Number.MAX_VALUE;if((0,u.ld)((0,u.Cr)(Y,Z,K),(0,u.Cr)(p,m,ee),G)){(0,l.e)(G,G,p);const t=(0,l.b)(G);(0,l.h)(G,G,1/t),e=t/(0,l.k)(p,m)}c(e,G,T)}}get hasEmissions(){return this.parameters.emissiveStrength>0}createBufferWriter(){return new N(E(this.parameters),this.parameters)}createGLMaterial(e){return new H(e)}validateParameters(e){"miter"!==e.join&&(e.miterLimit=0),null!=e.markerParameters&&(e.markerScale=e.markerParameters.width/e.width)}update(e){const{hasAnimation:t}=this.parameters;return!!t&&(this.setParameters({timeElapsed:(0,s.y)(e.time)},!1),0!==e.dt)}}class H extends g.A{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const t=this._material.parameters.stipplePattern;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(D,e)}}class I extends b.S{constructor(){super(...arguments),this.width=0,this.color=h.Un,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=0,this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=0,this.endTime=1/0,this.fadeInTime=0,this.fadeOutTime=1/0,this.emissiveStrength=0}get transparent(){return this.color[3]<1||this.hasAnimation||null!=this.stipplePattern&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return 0!==this.animation}}class N{constructor(e,t){this.layout=e,this._parameters=t;const i=t.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=i;break;case"round":this.numJoinSubdivisions=y.r+i}}_isClosed(e){return B(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){const t=e.get("position").indices.length/2+1,i=this._isClosed(e);let n=i?2:4;return n+=((i?t:t-1)-(i?0:1))*(2*this.numJoinSubdivisions+4),n+=2,this._parameters.wireframe&&(n=2+4*(n-2)),n}write(e,t,i,n,r,o){const s=this.layout,a=i.get("position"),c=a.indices,h=a.data.length/3,u=i.get("distanceToStart")?.data;c&&c.length!==2*(h-1)&&console.warn("RibbonLineMaterial does not support indices");const f=s.fields.has("sizeFeatureAttribute");let m=1,g=null;if(f){const e=i.get("sizeFeatureAttribute");1===e.data.length?m=e.data[0]:g=e.data}else m=i.get("size")?.data[0]??1;let S=[1,1,1,1],_=0,b=null;const y=s.fields.has("colorFeatureAttribute");if(y){const e=i.get("colorFeatureAttribute");1===e.data.length?_=e.data[0]:b=e.data}else S=i.get("color")?.data??S;const T=i.get("timeStamps")?.data,z=T&&s.fields.has("timeStamps"),C=s.fields.has("opacityFeatureAttribute");let O=0,A=null;if(C){const e=i.get("opacityFeatureAttribute");1===e.data.length?O=e.data[0]:A=e.data}const P=new Float32Array(r.buffer),w=(0,p.Bg)(r.buffer),D=new Uint8Array(r.buffer),R=s.stride/4;let E=o*R;const L=E;let W=0;const j=u?(e,t,i)=>W=u[i]:(e,t,i)=>W+=(0,l.k)(e,t),F=P.BYTES_PER_ELEMENT/w.BYTES_PER_ELEMENT,V=4/F,M=(0,v.E)(),H=(e,t,i,r,o,s,a,l)=>{P[E++]=t[0],P[E++]=t[1],P[E++]=t[2],(0,x.Wu)(e,t,w,E*F),E+=V,(0,x.Wu)(i,t,w,E*F),E+=V,P[E++]=l;let c=E*F;if(w[c++]=o,w[c++]=s,E=Math.ceil(c/F),y)P[E]=b?.[a]??_;else{const e=Math.min(4*a,S.length-4),t=4*E;D[t]=255*S[e],D[t+1]=255*S[e+1],D[t+2]=255*S[e+2],D[t+3]=255*S[e+3]}if(E++,P[E++]=g?.[a]??m,C&&(P[E++]=A?.[a]??O),M){let e=4*E;n?(D[e++]=n[0],D[e++]=n[1],D[e++]=n[2],D[e++]=n[3]):(D[e++]=0,D[e++]=0,D[e++]=0,D[e++]=0),E=Math.ceil(.25*e)}z&&(c=E*F,w[c++]=r[0],w[c++]=r[1],w[c++]=r[2],w[c++]=r[3],E=Math.ceil(c/F))};E+=R,(0,l.j)(ie,a.data[0],a.data[1],a.data[2]),z&&(0,d.s)(re,T[0],T[1],T[2],T[3]),e&&(0,l.t)(ie,ie,e);const I=this._isClosed(i);if(I){const t=a.data.length-3;(0,l.j)(te,a.data[t],a.data[t+1],a.data[t+2]),e&&(0,l.t)(te,te,e)}else(0,l.j)(ne,a.data[3],a.data[4],a.data[5]),e&&(0,l.t)(ne,ne,e),H(ie,ie,ne,re,1,-4,0,0),H(ie,ie,ne,re,1,4,0,0),(0,l.d)(te,ie),(0,l.d)(ie,ne),z&&(0,d.s)(re,T[4],T[5],T[6],T[7]);const N=I?0:1,B=I?h:h-1;for(let p=N;p<B;p++){const t=(p+1)%h*3;(0,l.j)(ne,a.data[t],a.data[t+1],a.data[t+2]),e&&(0,l.t)(ne,ne,e),j(te,ie,p),H(te,ie,ne,re,0,-1,p,W),H(te,ie,ne,re,0,1,p,W);const i=this.numJoinSubdivisions;for(let e=0;e<i;++e){const t=(e+1)/(i+1);H(te,ie,ne,re,t,-1,p,W),H(te,ie,ne,re,t,1,p,W)}if(H(te,ie,ne,re,1,-2,p,W),H(te,ie,ne,re,1,2,p,W),(0,l.d)(te,ie),(0,l.d)(ie,ne),z){const e=(p+1)%h*4;(0,d.s)(re,T[e],T[e+1],T[e+2],T[e+3])}}return I?((0,l.j)(ne,a.data[3],a.data[4],a.data[5]),e&&(0,l.t)(ne,ne,e),W=j(te,ie,B),H(te,ie,ne,re,0,-1,N,W),H(te,ie,ne,re,0,1,N,W)):(W=j(te,ie,B),H(te,ie,ie,re,0,-5,B,W),H(te,ie,ie,re,0,5,B,W)),k(P,L+R,P,L,R),E=k(P,E-R,P,E,R),this._parameters.wireframe&&this._addWireframeVertices(r,L,E,R),null}_addWireframeVertices(e,t,i,n){const r=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),o=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t);let s=0;const a=e=>s=k(o,e,r,s,n);for(let l=0;l<o.length-1;l+=2*n)a(l),a(l+2*n),a(l+1*n),a(l+2*n),a(l+1*n),a(l+3*n)}}function k(e,t,i,n,r){for(let o=0;o<r;o++)i[n++]=e[t++];return n}function B(e,t){return!!e.isClosed&&t.get("position").indices.length>2}const U=(0,c.vt)(),$=(0,c.vt)(),q=(0,c.vt)(),G=(0,c.vt)(),J=(0,c.vt)(),Q=(0,o.r_)(),X=(0,o.r_)(),Y=(0,c.vt)(),Z=(0,c.vt)(),K=(0,u.vt)(),ee=(0,u.vt)(),te=(0,c.vt)(),ie=(0,c.vt)(),ne=(0,c.vt)(),re=(0,h.vt)(),oe=[(0,o.r_)(),(0,o.r_)(),(0,o.r_)(),(0,o.r_)()],se=[(0,c.vt)(),(0,c.vt)(),(0,c.vt)(),(0,c.vt)()],ae=(0,f.vt)(),le=(0,f.vt)(),ce=(0,f.vt)(),de=(0,f.vt)()},56906:(e,t,i)=>{i.d(t,{q:()=>v,h:()=>g});var n=i(20179),r=i(3799),o=i(58350),s=i(23148),a=i(21390),l=i(86955),c=i(70367);i(93345),i(80895),i(96673);function d(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function h(e){if(null==e)return 1;const t=d(e);return Math.floor(t.reduce((e,t)=>e+t))}var p=i(43047),u=i(55855);function f(e){return null==e?u.uY:4===e.length?e:(0,p.s)(m,e[0],e[1],e[2],1)}const m=(0,u.vt)();function v(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(l.H`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const i=!(t.draped&&t.stipplePreferContinuous),{vertex:d,fragment:h}=e;t.draped||((0,r.yu)(d,t),d.uniforms.add(new s.U("worldToScreenPerDistanceRatio",e=>{let{camera:t}=e;return 1/t.perScreenPixelRatio})).code.add(l.H`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),d.code.add(l.H`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${l.H.float(S)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),(0,r.Nz)(d),d.code.add(l.H`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),h.uniforms.add(new c.N("stipplePatternTexture",e=>e.stippleTexture),new a.m("stipplePatternPixelSizeInv",e=>1/g(e))),t.stippleOffColorEnabled&&h.uniforms.add(new o.E("stippleOffColor",e=>f(e.stippleOffColor))),e.include(n.m),h.code.add(l.H`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
float lineSizeInv = noPerspectiveRead(vLineSizeInv);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
u = fract(u);
float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha(float lineWidth) {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),h.code.add(l.H`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${(0,l.If)(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function g(e){const t=e.stipplePattern;return t?h(e.stipplePattern)/t.pixelRatio:1}const S=.4},66470:(e,t,i)=>{function n(e){return"position"===e}i.d(t,{b:()=>n})},67425:(e,t,i)=>{i.d(t,{I2:()=>u,Kf:()=>m,Uk:()=>S,ai:()=>g,au:()=>d,fe:()=>v,nG:()=>p,nu:()=>f,sE:()=>h});var n=i(34761),r=i(13191),o=i(9392),s=i(5809),a=i(45308),l=i(81284),c=i(80935);function d(e,t,i,n,r,o,s,l,c,d,h){const p=_[h.mode];let u,f,m=0;if((0,a.projectBuffer)(e,t,i,n,c.spatialReference,r,l))return p?.requiresAlignment(h)?(m=p.applyElevationAlignmentBuffer(n,r,o,s,l,c,d,h),u=o,f=s):(u=n,f=r),(0,a.projectBuffer)(u,c.spatialReference,f,o,d.spatialReference,s,l)?m:void 0}function h(e,t,i,n,r){const o=((0,l.v)(e)?e.z:(0,c.cN)(e)?e.array[e.offset+2]:e[2])||0;switch(i.mode){case"on-the-ground":{const i=(0,c.R1)(t,e,"ground")??0;return r.verticalDistanceToGround=0,r.sampledElevation=i,void(r.z=i)}case"relative-to-ground":{const s=(0,c.R1)(t,e,"ground")??0,a=i.geometryZWithOffset(o,n);return r.verticalDistanceToGround=a,r.sampledElevation=s,void(r.z=a+s)}case"relative-to-scene":{const s=(0,c.R1)(t,e,"scene")??0,a=i.geometryZWithOffset(o,n);return r.verticalDistanceToGround=a,r.sampledElevation=s,void(r.z=a+s)}case"absolute-height":{const s=i.geometryZWithOffset(o,n),a=(0,c.R1)(t,e,"ground")??0;return r.verticalDistanceToGround=s-a,r.sampledElevation=a,void(r.z=s)}default:return void(r.z=0)}}function p(e,t,i,n){return h(e,t,i,n,x),x.z}function u(e,t,i){return"on-the-ground"===t&&"on-the-ground"===i?e.staysOnTheGround:t===i||"on-the-ground"!==t&&"on-the-ground"!==i?null==t||null==i?e.definedChanged:1:e.onTheGroundChanged}function f(e){return"relative-to-ground"===e||"relative-to-scene"===e}function m(e){return"absolute-height"!==e}function v(e,t,i,r,o){h(t,i,o,r,x),g(e,x.verticalDistanceToGround);const a=x.sampledElevation,l=(0,n.C)(b,e.transformation);return y[0]=t.x,y[1]=t.y,y[2]=x.z,(0,s.l)(t.spatialReference,y,l,r.spatialReference)?e.transformation=l:console.warn("Could not locate symbol object properly, it might be misplaced"),a}function g(e,t){for(let i=0;i<e.geometries.length;++i){const n=e.geometries[i].getMutableAttribute("centerOffsetAndDistance");n&&n.data[3]!==t&&(n.data[3]=t,e.geometryVertexAttributeUpdated(e.geometries[i],"centerOffsetAndDistance"))}}class S{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}const _={"absolute-height":{applyElevationAlignmentBuffer:function(e,t,i,n,r,o,s,a){const l=a.calculateOffsetRenderUnits(s),c=a.featureExpressionInfoContext;t*=3,n*=3;for(let d=0;d<r;++d){const r=e[t],o=e[t+1],s=e[t+2];i[n]=r,i[n+1]=o,i[n+2]=null==c?s+l:l,t+=3,n+=3}return 0},requiresAlignment:function(e){const t=e.meterUnitOffset,i=e.featureExpressionInfoContext;return 0!==t||null!=i}},"on-the-ground":{applyElevationAlignmentBuffer:function(e,t,i,n,r,o){let s=0;const a=o.spatialReference;t*=3,n*=3;for(let l=0;l<r;++l){const r=e[t],l=e[t+1],c=e[t+2],d=o.getElevation(r,l,c,a,"ground")??0;s+=d,i[n]=r,i[n+1]=l,i[n+2]=d,t+=3,n+=3}return s/r},requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:function(e,t,i,n,r,o,s,a){let l=0;const c=a.calculateOffsetRenderUnits(s),d=a.featureExpressionInfoContext,h=o.spatialReference;t*=3,n*=3;for(let p=0;p<r;++p){const r=e[t],s=e[t+1],a=e[t+2],p=o.getElevation(r,s,a,h,"ground")??0;l+=p,i[n]=r,i[n+1]=s,i[n+2]=null==d?a+p+c:p+c,t+=3,n+=3}return l/r},requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:function(e,t,i,n,r,o,s,a){let l=0;const c=a.calculateOffsetRenderUnits(s),d=a.featureExpressionInfoContext,h=o.spatialReference;t*=3,n*=3;for(let p=0;p<r;++p){const r=e[t],s=e[t+1],a=e[t+2],p=o.getElevation(r,s,a,h,"scene")??0;l+=p,i[n]=r,i[n+1]=s,i[n+2]=null==d?a+p+c:p+c,t+=3,n+=3}return l/r},requiresAlignment:()=>!0}},b=(0,r.vt)(),x=new S,y=(0,o.vt)()},67737:(e,t,i)=>{i.d(t,{G:()=>n,Q:()=>r});const n={stableRendering:!1},r={rootOrigin:null}},68967:(e,t,i)=>{i.d(t,{Ci:()=>o,PC:()=>s,Vk:()=>a});var n=i(9392),r=i(99643);function o(e,t){return null==e&&(e=[]),e.push(t),e}function s(e,t){if(null==e)return null;const i=e.filter(e=>e!==t);return 0===i.length?null:i}function a(e,t,i,n,o){l[0]=e.get(t,0),l[1]=e.get(t,1),l[2]=e.get(t,2),(0,r.jS)(l,c,3),i.set(o,0,c[0]),n.set(o,0,c[1]),i.set(o,1,c[2]),n.set(o,1,c[3]),i.set(o,2,c[4]),n.set(o,2,c[5])}const l=(0,n.vt)(),c=new Float32Array(6)},74e3:(e,t,i)=>{i.d(t,{CI:()=>o,fk:()=>s});i(81806);var n=i(15941),r=i(80963);function o(e,t){return e===t||null!=e&&null!=t&&(0,r.aI)(e.spatialReference,t.spatialReference)&&e.x===t.x&&e.y===t.y&&e.z===t.z&&e.m===t.m}function s(e,t,i){return e===t||null!=e&&null!=t&&(0,r.aI)(e.spatialReference,t.spatialReference)&&(0,n.Sp)(e.x,t.x,i)&&(0,n.Sp)(e.y,t.y,i)&&(0,n.Sp)(e.z??0,t.z??0,i)&&(0,n.Sp)(e.m??0,t.m??0,i)}},75507:(e,t,i)=>{i.d(t,{f:()=>o});var n=i(9392);class r{constructor(e,t){this.vec3=e,this.id=t}}function o(e,t,i,o){return new r((0,n.fA)(e,t,i),o)}},80935:(e,t,i)=>{i.d(t,{R1:()=>s,aY:()=>r,cN:()=>o});var n=i(81284);class r{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.array=e,this.spatialReference=t,this.offset=i}}function o(e){return"array"in e}function s(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"ground";if((0,n.v)(t))return e.getElevation(t.x,t.y,t.z||0,t.spatialReference,i);if(o(t)){let n=t.offset;return e.getElevation(t.array[n++],t.array[n++],t.array[n]||0,t.spatialReference??e.spatialReference,i)}return e.getElevation(t[0],t[1],t[2]||0,e.spatialReference,i)}},94536:(e,t,i)=>{i.d(t,{x:()=>h});var n=i(3789),r=i(5457),o=i(20664),s=i(9392),a=i(4763),l=i(95925),c=i(78315),d=i(86994);class h{get bounds(){return this._root.bounds}get halfSize(){return this._root.halfSize}get root(){return this._root.node}get maximumObjectsPerNode(){return this._maximumObjectsPerNode}get maximumDepth(){return this._maximumDepth}get objectCount(){return this._objectCount}constructor(e,t){this.objectToBoundingSphere=e,this._maximumObjectsPerNode=10,this._maximumDepth=20,this._degenerateObjects=new Set,this._root=new p,this._objectCount=0,t&&(void 0!==t.maximumObjectsPerNode&&(this._maximumObjectsPerNode=t.maximumObjectsPerNode),void 0!==t.maximumDepth&&(this._maximumDepth=t.maximumDepth))}destroy(){this._degenerateObjects.clear(),p.clearPool(),P[0]=null,L.prune(),H.prune()}add(e){const t=Array.from(e);this._grow(t);const i=p.acquire();for(const n of t)++this._objectCount,this._isDegenerate(n)?this._degenerateObjects.add(n):(i.init(this._root),this._add(n,i));p.release(i)}remove(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this._objectCount-=e.length;const i=p.acquire();for(const n of e){const e=t??(0,c.m)(this.objectToBoundingSphere(n),W);z(e[3])?(i.init(this._root),m(n,e,i)):this._degenerateObjects.delete(n)}p.release(i),this._shrink()}update(e,t){if(!z(t[3])&&this._isDegenerate(e))return;const i=function(e){return P[0]=e,P}(e);this.remove(i,t),this.add(i)}forEachAlongRay(e,t,i){const n=(0,l.LV)(e,t);u(this._root,e=>{if(!function(e,t){return b((0,c.a)(t.bounds),2*-t.halfSize,R),b((0,c.a)(t.bounds),2*t.halfSize,E),(0,d.O_)(e.origin,e.direction,R,E)}(n,e))return!1;const t=e.node;return t.terminals.forAll(e=>{this._intersectsObject(n,e)&&i(e)}),null!==t.residents&&t.residents.forAll(e=>{this._intersectsObject(n,e)&&i(e)}),!0})}forEachAlongRayWithVerticalOffset(e,t,i,n){const r=(0,l.LV)(e,t);u(this._root,e=>{if(!function(e,t,i){return b((0,c.a)(t.bounds),2*-t.halfSize,R),b((0,c.a)(t.bounds),2*t.halfSize,E),i.applyToMinMax(R,E),(0,d.O_)(e.origin,e.direction,R,E)}(r,e,n))return!1;const t=e.node;return t.terminals.forAll(e=>{this._intersectsObjectWithOffset(r,e,n)&&i(e)}),null!==t.residents&&t.residents.forAll(e=>{this._intersectsObjectWithOffset(r,e,n)&&i(e)}),!0})}forEach(e){u(this._root,t=>{const i=t.node;return i.terminals.forAll(e),null!==i.residents&&i.residents.forAll(e),!0}),this._degenerateObjects.forEach(e)}forEachDegenerateObject(e){this._degenerateObjects.forEach(e)}findClosest(e,t,i){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:()=>!0,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1/0,s=1/0,l=1/0,d=null;const h=y(e,t),p=o=>{if(--r,!n(o))return;const h=this.objectToBoundingSphere(o);if(!(0,a.m7)(i,h))return;const p=T(e,t,(0,c.a)(h)),u=p-h[3],f=p+h[3];u<s&&(s=u,l=f,d=o)};return f(this._root,n=>{if(r<=0||!(0,a.m7)(i,n.bounds))return!1;if((0,o.h)(D,h,n.halfSize),(0,o.g)(D,D,(0,c.a)(n.bounds)),T(e,t,D)>l)return!1;const s=n.node;return s.terminals.forAll(e=>p(e)),null!==s.residents&&s.residents.forAll(e=>p(e)),!0},e,t),d}forEachInDepthRange(e,t,i,n,r,s,l){let d=-1/0,h=1/0;const p={setRange:e=>{1===i?(d=Math.max(d,e.near),h=Math.min(h,e.far)):(d=Math.max(d,-e.far),h=Math.min(h,-e.near))}};p.setRange(n);const u=T(t,i,e),m=y(t,i),v=y(t,-i),g=e=>{if(!l(e))return;const n=this.objectToBoundingSphere(e),o=T(t,i,(0,c.a)(n))-u,f=o-n[3],m=o+n[3];f>h||m<d||!(0,a.m7)(s,n)||r(e,p)};f(this._root,e=>{if(!(0,a.m7)(s,e.bounds))return!1;if((0,o.h)(D,m,e.halfSize),(0,o.g)(D,D,(0,c.a)(e.bounds)),T(t,i,D)-u>h)return!1;if((0,o.h)(D,v,e.halfSize),(0,o.g)(D,D,(0,c.a)(e.bounds)),T(t,i,D)-u<d)return!1;const n=e.node;return n.terminals.forAll(e=>g(e)),null!==n.residents&&n.residents.forAll(e=>g(e)),!0},t,i)}forEachNode(e){u(this._root,t=>e(t.node,t.bounds,t.halfSize,t.depth))}forEachNeighbor(e,t){const i=(0,c.g)(t),n=(0,c.n)(t,(0,s.vt)()),r=t=>{const r=this.objectToBoundingSphere(t),s=(0,c.g)(r),a=i+s;return!((0,o.s)((0,c.a)(r),n)-a*a<=0)||e(t)};let a=!0;const l=e=>{a&&(a=r(e))};u(this._root,e=>{const t=(0,c.g)(e.bounds),r=i+t;if((0,o.s)((0,c.a)(e.bounds),n)-r*r>0)return!1;const s=e.node;return s.terminals.forAll(l),a&&null!==s.residents&&s.residents.forAll(l),a}),a&&this.forEachDegenerateObject(l)}_intersectsObject(e,t){const i=this.objectToBoundingSphere(t);return!(i[3]>0)||(0,c.w)(i,e)}_intersectsObjectWithOffset(e,t,i){const n=this.objectToBoundingSphere(t);return!(n[3]>0)||(0,c.w)(i.applyToBoundingSphere(n),e)}_add(e,t){t.advanceTo(this.objectToBoundingSphere(e))?t.node.terminals.push(e):(t.node.residents.push(e),t.node.residents.length>this._maximumObjectsPerNode&&t.depth<this._maximumDepth&&this._split(t))}_split(e){const t=e.node.residents;e.node.residents=null;for(let i=0;i<t.length;i++){const n=p.acquire().init(e);this._add(t.at(i),n),p.release(n)}}_grow(e){if(x(e,e=>this.objectToBoundingSphere(e),j),z(j[3])&&!this._fitsInsideTree(j))if(g(this._root.node))(0,c.m)(j,this._root.bounds),this._root.halfSize=1.25*this._root.bounds[3],this._root.updateBoundsRadiusFromHalfSize();else{const e=this._rootBoundsForRootAsSubNode(j);this._placingRootViolatesMaxDepth(e)?this._rebuildTree(j,e):this._growRootAsSubNode(e),p.release(e)}}_rebuildTree(e,t){(0,c.x)(F,t.bounds),F[3]=t.halfSize,x([e,F],e=>e,V);const i=p.acquire().init(this._root);this._root.initFrom(null,V,V[3]),this._root.increaseHalfSize(1.25),u(i,e=>(this.add(e.node.terminals.data),null!==e.node.residents&&this.add(e.node.residents.data),!0)),p.release(i)}_placingRootViolatesMaxDepth(e){const t=Math.log(e.halfSize/this._root.halfSize)*Math.LOG2E;let i=0;return u(this._root,e=>(i=Math.max(i,e.depth),i+t<=this._maximumDepth)),i+t>this._maximumDepth}_rootBoundsForRootAsSubNode(e){const t=e[3],i=e;let n=-1/0;const r=this._root.bounds,o=this._root.halfSize;for(let a=0;a<3;a++){const e=r[a]-o-(i[a]-t),s=i[a]+t-(r[a]+o),l=Math.max(0,Math.ceil(e/(2*o))),c=Math.max(0,Math.ceil(s/(2*o)))+1,d=2**Math.ceil(Math.log(l+c)*Math.LOG2E);n=Math.max(n,d),M[a].min=l,M[a].max=c}for(let a=0;a<3;a++){let e=M[a].min,t=M[a].max;const i=(n-(e+t))/2;e+=Math.ceil(i),t+=Math.floor(i);const s=r[a]-o-e*o*2;w[a]=s+(t+e)*o}const s=n*o;return w[3]=s*A,p.acquire().initFrom(null,w,s,0)}_growRootAsSubNode(e){const t=this._root.node;(0,c.x)(j,this._root.bounds),j[3]=this._root.halfSize,this._root.init(e),e.advanceTo(j,null,!0),e.node.children=t.children,e.node.residents=t.residents,e.node.terminals=t.terminals}_shrink(){for(;;){const e=this._findShrinkIndex();if(-1===e)break;this._root.advance(e),this._root.depth=0}}_findShrinkIndex(){if(0!==this._root.node.terminals.length||this._root.isLeaf())return-1;let e=null;const t=this._root.node.children;let i=0,n=0;for(;n<t.length&&null==e;)i=n++,e=t[i];for(;n<t.length;)if(t[n++])return-1;return i}_isDegenerate(e){return!z(this.objectToBoundingSphere(e)[3])}_fitsInsideTree(e){const t=this._root.bounds,i=this._root.halfSize;return e[3]<=i&&e[0]>=t[0]-i&&e[0]<=t[0]+i&&e[1]>=t[1]-i&&e[1]<=t[1]+i&&e[2]>=t[2]-i&&e[2]<=t[2]+i}toJSON(){const{maximumDepth:e,maximumObjectsPerNode:t,_objectCount:i}=this,n=this._nodeToJSON(this._root.node);return{maximumDepth:e,maximumObjectsPerNode:t,objectCount:i,root:{bounds:this._root.bounds,halfSize:this._root.halfSize,depth:this._root.depth,node:n}}}_nodeToJSON(e){const t=e.children.map(e=>e?this._nodeToJSON(e):null),i=e.residents?.map(e=>this.objectToBoundingSphere(e)),n=e.terminals?.map(e=>this.objectToBoundingSphere(e));return{children:t,residents:i,terminals:n}}static fromJSON(e){const t=new h(e=>e,{maximumDepth:e.maximumDepth,maximumObjectsPerNode:e.maximumObjectsPerNode});return t._objectCount=e.objectCount,t._root.initFrom(e.root.node,e.root.bounds,e.root.halfSize,e.root.depth),t}}class p{constructor(){this.bounds=(0,c.c)(),this.halfSize=0,this.initFrom(null,null,0,0)}init(e){return this.initFrom(e.node,e.bounds,e.halfSize,e.depth)}initFrom(e,t,i){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:this.depth;return this.node=null!=e?e:p.createEmptyNode(),t&&(0,c.m)(t,this.bounds),this.halfSize=i,this.depth=n,this}increaseHalfSize(e){this.halfSize*=e,this.updateBoundsRadiusFromHalfSize()}updateBoundsRadiusFromHalfSize(){this.bounds[3]=this.halfSize*A}advance(e){let t=this.node.children[e];t||(t=p.createEmptyNode(),this.node.children[e]=t),this.node=t,this.halfSize/=2,this.depth++;const i=C[e];return this.bounds[0]+=i[0]*this.halfSize,this.bounds[1]+=i[1]*this.halfSize,this.bounds[2]+=i[2]*this.halfSize,this.updateBoundsRadiusFromHalfSize(),this}advanceTo(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(;;){if(this.isTerminalFor(e))return t?.(this,-1),!0;if(this.isLeaf()){if(!i)return t?.(this,-1),!1;this.node.residents=null}const n=this._childIndex(e);t?.(this,n),this.advance(n)}}isLeaf(){return null!=this.node.residents}isTerminalFor(e){return e[3]>this.halfSize/2}_childIndex(e){const t=this.bounds;return(t[0]<e[0]?1:0)+(t[1]<e[1]?2:0)+(t[2]<e[2]?4:0)}static createEmptyNode(){return{children:[null,null,null,null,null,null,null,null],terminals:new r.A({shrink:!0}),residents:new r.A({shrink:!0})}}static#e=(()=>this._pool=new n.A(()=>new p))();static acquire(){return p._pool.acquire()}static release(e){p._pool.release(e)}static clearPool(){p._pool.prune()}}function u(e,t){let i=p.acquire().init(e);const n=[i];for(;0!==n.length;){if(i=n.pop(),t(i)&&!i.isLeaf())for(let e=0;e<i.node.children.length;e++)i.node.children[e]&&n.push(p.acquire().init(i).advance(e));p.release(i)}}function f(e,t,i){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,r=p.acquire().init(e);const o=[r];for(function(e,t,i){if(!H.length)for(let n=0;n<8;++n)H.push({index:0,distance:0});for(let n=0;n<8;++n){const i=C[n];H.data[n].index=n,H.data[n].distance=T(e,t,i)}H.sort((e,t)=>e.distance-t.distance);for(let n=0;n<8;++n)i[n]=H.data[n].index}(i,n,I);0!==o.length;){if(r=o.pop(),t(r)&&!r.isLeaf())for(let e=7;e>=0;--e){const t=I[e];r.node.children[t]&&o.push(p.acquire().init(r).advance(t))}p.release(r)}}function m(e,t,i){L.clear();const n=i.advanceTo(t,(e,t)=>{L.push(e.node),L.push(t)})?i.node.terminals:i.node.residents;if(n.removeUnordered(e),0===n.length)for(let r=L.length-2;r>=0&&v(L.data[r],L.data[r+1]);r-=2);}function v(e,t){return t>=0&&(e.children[t]=null),!!g(e)&&(null===e.residents&&(e.residents=new r.A({shrink:!0})),!0)}function g(e){if(0!==e.terminals.length)return!1;if(null!==e.residents)return 0===e.residents.length;for(let t=0;t<e.children.length;t++)if(e.children[t])return!1;return!0}function S(e,t){e[0]=Math.min(e[0],t[0]-t[3]),e[1]=Math.min(e[1],t[1]-t[3]),e[2]=Math.min(e[2],t[2]-t[3])}function _(e,t){e[0]=Math.max(e[0],t[0]+t[3]),e[1]=Math.max(e[1],t[1]+t[3]),e[2]=Math.max(e[2],t[2]+t[3])}function b(e,t,i){i[0]=e[0]+t,i[1]=e[1]+t,i[2]=e[2]+t}function x(e,t,i){R[0]=1/0,R[1]=1/0,R[2]=1/0,E[0]=-1/0,E[1]=-1/0,E[2]=-1/0;for(const n of e){const e=t(n);z(e[3])&&(S(R,e),_(E,e))}(0,c.o)(i,(0,o.l)(N,R,E,.5)),i[3]=Math.max(E[0]-R[0],E[1]-R[1],E[2]-R[2])/2}function y(e,t){let i,n=1/0;for(let r=0;r<8;++r){const o=T(e,t,O[r]);o<n&&(n=o,i=O[r])}return i}function T(e,t,i){return t*(e[0]*i[0]+e[1]*i[1]+e[2]*i[2])}function z(e){return!isNaN(e)&&e!==-1/0&&e!==1/0&&e>0}const C=[(0,s.fA)(-1,-1,-1),(0,s.fA)(1,-1,-1),(0,s.fA)(-1,1,-1),(0,s.fA)(1,1,-1),(0,s.fA)(-1,-1,1),(0,s.fA)(1,-1,1),(0,s.fA)(-1,1,1),(0,s.fA)(1,1,1)],O=[(0,s.fA)(-1,-1,-1),(0,s.fA)(-1,-1,1),(0,s.fA)(-1,1,-1),(0,s.fA)(-1,1,1),(0,s.fA)(1,-1,-1),(0,s.fA)(1,-1,1),(0,s.fA)(1,1,-1),(0,s.fA)(1,1,1)],A=Math.sqrt(3),P=[null];const w=(0,c.c)(),D=(0,s.vt)(),R=(0,s.vt)(),E=(0,s.vt)(),L=new r.A,W=(0,c.c)(),j=(0,c.c)(),F=(0,c.c)(),V=(0,c.c)(),M=[{min:0,max:0},{min:0,max:0},{min:0,max:0}],H=new r.A,I=[0,0,0,0,0,0,0,0],N=(0,s.vt)()},97583:(e,t,i)=>{i.d(t,{g:()=>m});i(81806);var n=i(90632),r=i(20664),o=i(9392),s=i(55855),a=i(45308),l=i(50468),c=i(17345),d=i(75507),h=i(37046),p=i(67737),u=i(8918),f=i(52479);class m{constructor(e){this._originSR=e,this._rootOriginId="root/"+(0,n.c)(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5}getOrigin(e){const t=this._origins.get(this._rootOriginId);if(null==t){const t=p.Q.rootOrigin;if(null!=t)return this._origins.set(this._rootOriginId,(0,d.f)(t[0],t[1],t[2],this._rootOriginId)),this.getOrigin(e);const i=(0,d.f)(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,i),i}const i=this._gridSize,n=Math.round(e[0]/i),o=Math.round(e[1]/i),s=Math.round(e[2]/i),a=`${n}/${o}/${s}`;let l=this._origins.get(a);const c=.5*i;if((0,r.e)(v,e,t.vec3),v[0]=Math.abs(v[0]),v[1]=Math.abs(v[1]),v[2]=Math.abs(v[2]),v[0]<c&&v[1]<c&&v[2]<c){if(l){const t=Math.max(...v);if((0,r.e)(v,e,l.vec3),v[0]=Math.abs(v[0]),v[1]=Math.abs(v[1]),v[2]=Math.abs(v[2]),Math.max(...v)<t)return l}return t}return l||(l=(0,d.f)(n*i,o*i,s*i,a),this._origins.set(a,l)),l}_drawOriginBox(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(0,s.fA)(1,1,0,1);const i=window.view,n=i.stage,r=t.toString();if(!this._objects.has(r)){this._material=new f.W({width:2,color:t},!1);const e=new u.x(n,{pickable:!1}),i=new h.B({castShadow:!1});e.add(i),this._objects.set(r,i)}const o=this._objects.get(r),d=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],p=d.length,m=new Array(3*p),v=new Array,g=.5*this._gridSize;for(let s=0;s<p;s++)m[3*s]=e[0]+(1&d[s]?g:-g),m[3*s+1]=e[1]+(2&d[s]?g:-g),m[3*s+2]=e[2]+(4&d[s]?g:-g),s>0&&v.push(s-1,s);(0,a.projectBuffer)(m,this._originSR,0,m,i.renderSpatialReference,0,p);const S=new c.V(this._material,[["position",new l.n(m,v,3,!0)]],null,2);o.addGeometry(S)}get test(){}}const v=(0,o.vt)()},99443:(e,t,i)=>{i.d(t,{Cz:()=>r,DZ:()=>a,PV:()=>s,vO:()=>n});i(72900),i(93345),i(80895),i(96673);const n=64,r=n/2,o=r/5,s=n/o,a=.25}}]);
//# sourceMappingURL=3823.70b6c403.chunk.js.map