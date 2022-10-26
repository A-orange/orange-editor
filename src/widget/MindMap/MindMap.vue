<template>
  <div
    id="orange-min-map-control"
    class="orange-mind-map-control"
    data-placeholder="点击进入配置"
  >
  
  </div>
  <teleport v-if="vueFlowContent" :to="vueFlowContent">
    <vue-flow
      class="flow-chart-wrap"
      :id="controlId"
      v-model="value"
    >
      <div class="flow-chart-control">
        <div class="control-item" v-show="!vueFlowControl.shrink.value">
          <Icon :size="14" color="#333" @click="vueFlowControl.setZoom(vueFlowControl.zoom.value -= 0.1)">
            <svg>
              <path
                d="M587.229378 437.990403 580.722174 437.990403 76.975139 437.990403 76.975139 581.918419 580.722174 581.918419 587.229378 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
            </svg>
          </Icon>
          <el-popover
            placement="top"
            :width="200"
            trigger="click"
            effect="dark"
            offset="20"
            :persistent="false"
            popper-class="vue-flow-control-popper"
          >
            <template #reference>
              <div class="zoom-input">
                {{ (vueFlowControl.zoom.value * 100).toFixed(0) + '%' }}
              </div>
            </template>
            <div class="zoom-popper">
              <div class="command-item"
                   @click="vueFlowContent = vueFlowContent === '#full-screen-content' ? '#orange-min-map-control' : '#full-screen-content'"
              >
                <span>{{ vueFlowContent === '#full-screen-content' ? '取消全屏' : '全屏' }}</span>
                <span>F11</span>
              </div>
              <div class="command-item" @click="vueFlowControl.setFitView">
                <span>适应全部</span>
                <span>Shift + 1</span>
              </div>
              <div class="command-item">
                <span>适应选中</span>
                <span>Shift + 2</span>
              </div>
              <el-divider style="margin: 0; border-top-color: #c1c1c3;"/>
              <div class="command-item">
                <el-slider
                  v-model="vueFlowControl.zoom.value"
                  :min="0.01"
                  :max="5"
                  :step="0.01"
                  size="small"
                  :show-tooltip="false"
                  @change="vueFlowControl.setZoom"
                />
              </div>
            </div>
          </el-popover>
          <Icon :size="14" color="#333" @click="vueFlowControl.setZoom(vueFlowControl.zoom.value += 0.1)">
            <svg>
              <path
                d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
            </svg>
          </Icon>
        </div>
        <div class="control-item" v-show="!vueFlowControl.shrink.value" @click="vueFlowControl.setLock(!vueFlowControl.lock.value)">
          <Icon v-show="vueFlowControl.lock.value" :size="16" color="#333">
            <svg>
              <path
                d="M385.150849 385.662338l-128.895105 0 0-150.377622q0-49.102897 19.436563-91.556444t53.706294-74.677323 80.815185-50.637363 101.786214-18.413586q49.102897 0 94.625375 18.413586t80.815185 50.637363 56.263736 74.677323 20.971029 91.556444l0 150.377622-123.78022 0 0-121.734266q0-64.447552-35.804196-99.74026t-97.182817-35.292707q-55.240759 0-88.999001 35.292707t-33.758242 99.74026l0 121.734266zM826.053946 447.040959q27.62038 0 47.568432 19.948052t19.948052 47.568432l0 317.122877q0 27.62038-9.718282 51.66034t-26.597403 41.942058-39.896104 28.131868-50.637363 10.22977l-516.603397 0q-27.62038 0-50.125874-10.22977t-38.361638-27.108891-24.551449-39.384615-8.695305-48.07992l0-324.283716q0-27.62038 19.436563-47.568432t47.056943-19.948052l61.378621 0 128.895105 0 255.744256 0 123.78022 0 61.378621 0z"></path>
            </svg>
          </Icon>
          <Icon v-show="!vueFlowControl.lock.value" :size="16" color="#333">
            <svg>
              <path
                d="M768.25422 0q48.810328 0 94.061569 18.303873t80.333664 50.33565 56.436941 74.740814 21.354518 91.519364l0 150.49851-123.042701 0 0-122.025819q0-64.063555-36.099305-99.654419t-97.112214-35.590864q-54.911619 0-88.468719 35.590864t-33.5571 99.654419l0 124.059583-128.12711 0 0-152.532274q0-48.810328 19.320755-91.519364t53.386296-74.740814 80.333664-50.33565 101.179742-18.303873zM766.220457 693.513406l0 87.451837 0 47.793446q0 27.455809-9.660377 51.860973t-26.438928 41.692155-39.658391 27.455809-50.33565 10.168818l-514.542205 0q-27.455809 0-49.82721-9.660377t-38.641509-26.438928-24.913605-39.14995-8.643496-47.793446l0-323.368421q0-28.472691 19.829196-47.793446t46.268123-19.320755l629.449851 0q28.472691 0 47.793446 19.320755t19.320755 47.793446l0 179.988083z"></path>
            </svg>
          </Icon>
        </div>
        <div class="control-item" v-show="!vueFlowControl.shrink.value">
          <el-popover
            :visible="vueFlowControl.map.value"
            placement="top-end"
            :width="200"
            trigger="click"
            effect="dark"
            offset="20"
            :persistent="false"
            popper-class="vue-flow-control-popper"
          >
            <template #reference>
              <Icon :size="16" :color="vueFlowControl.map.value ? '#2e9cfe':'#333'"
                    @click="vueFlowControl.map.value = !vueFlowControl.map.value">
                <svg>
                  <path
                    d="M111.3 210.5l177.9-107.9c14-8.5 32.2-4.1 40.7 9.9 2.8 4.7 4.3 10 4.3 15.5v655.6c0 10.4-5.4 20.1-14.4 25.5L142 915.4c-14 8.4-32.2 3.9-40.7-10.2-2.8-4.6-4.2-9.9-4.2-15.3v-654c0-10.4 5.4-20 14.2-25.4z m592.9 0L882 102.6c14-8.5 32.2-4.1 40.7 9.9 2.8 4.7 4.3 10 4.3 15.5v655.6c0 10.4-5.4 20.1-14.4 25.5L734.8 915.4c-14 8.4-32.2 3.9-40.7-10.2-2.8-4.6-4.2-9.9-4.2-15.3v-654c0.1-10.4 5.4-20 14.3-25.4z m-265.7-74.3l177.9 106.5c8.9 5.4 14.4 15 14.4 25.4v630.2c0 16.4-13.3 29.6-29.7 29.6-5.4 0-10.7-1.5-15.3-4.3L407.9 816.2c-8.9-5.3-14.4-15-14.4-25.4V161.6c0-16.4 13.3-29.6 29.6-29.6 5.4 0 10.7 1.4 15.4 4.2z"></path>
                </svg>
              </Icon>
            </template>
            <div class="map-popper">
              <MiniMap nodeColor="#afd9ff" maskColor="#f1f1f1" :width="200" :height="150"/>
            </div>
          </el-popover>
        </div>
        <div class="control-item" v-show="!vueFlowControl.shrink.value" @click="">
          <Icon :size="16" color="#333">
            <svg>
              <path d="M0 0m64 0l192 0q64 0 64 64l0 192q0 64-64 64l-192 0q-64 0-64-64l0-192q0-64 64-64Z"
                    p-id="11215"></path>
              <path d="M768 384m64 0l128 0q64 0 64 64l0 128q0 64-64 64l-128 0q-64 0-64-64l0-128q0-64 64-64Z"
                    p-id="11216"></path>
              <path d="M768 768m64 0l128 0q64 0 64 64l0 128q0 64-64 64l-128 0q-64 0-64-64l0-128q0-64 64-64Z"
                    p-id="11217"></path>
              <path
                d="M208 560v248.32a48 48 0 0 0 48 48h570.24a48.64 48.64 0 0 1 48 48 48 48 0 0 1-48 48H160a48 48 0 0 1-48-48V232.96a48 48 0 0 1 48-48 48 48 0 0 1 48 48v231.04h618.24a48.64 48.64 0 0 1 48 48 48.64 48.64 0 0 1-48 48z"></path>
            </svg>
          </Icon>
        </div>
        <div class="control-item" @click="vueFlowControl.shrink.value = !vueFlowControl.shrink.value">
          <Icon v-if="vueFlowControl.shrink.value" :size="20" color="#333">
            <svg><path d="M896 192H128v128h768V192z m0 256H384v128h512V448z m0 256H128v128h768v-128zM320 384L128 512l192 128V384z"></path></svg>
          </Icon>
          <Icon v-else :size="20" color="#333">
            <svg><path d="M128 192h768v128H128V192z m0 256h512v128H128V448z m0 256h768v128H128v-128z m576-320l192 128-192 128V384z"></path></svg>
          </Icon>
        </div>
      </div>
      <template #node-custom="node">
        <div class="mind-node">
          <div
            :class="['node-content', node.data?.type, {'node-active': node.selected}]"
            :style="{
              boxShadow: '0 0 0 2px ' + node.data?.theme
            }"
          >
            <div
              class="node-editor"
              contenteditable="true"
              @mousedown.stop
            >
              {{ node.label }}
            </div>
            <div
              v-for="handle in ['left', 'right']"
              :key="handle"
              :class="['node-handle', 'handle-' + handle]"
            >
              <div class="shrink" @click="shrinkNode(node, handle)">
                <Icon :size="12" color="#333">
                  <svg>
                    <path
                      d="M587.229378 437.990403 580.722174 437.990403 76.975139 437.990403 76.975139 581.918419 580.722174 581.918419 587.229378 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
                  </svg>
                </Icon>
              </div>
              <div class="add-node" @click="addNode(node,handle)">
                <Icon :size="14" color="#2e9cfe">
                  <svg>
                    <path
                      d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"></path>
                  </svg>
                </Icon>
              </div>
            </div>
          </div>
          <Handle id="left" :position="Position.Left"/>
          <Handle id="right" :position="Position.Right"/>
        </div>
      </template>
      <Background pattern-color="#666" gap="20"/>
    </vue-flow>
  </teleport>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import type {PropType} from "vue";
import {Handle, Position, useVueFlow, getOutgoers} from "@vue-flow/core";
import type {Node, GraphNode} from "@vue-flow/core";
import {Background, MiniMap} from "@vue-flow/additional-components";
import Icon from "@/components/Icon/Icon.vue"
import {rnd} from "@/utils/string";

const props = defineProps({
  value: {
    type: Array as PropType<Array<Node>>,
    default: []
  },
  controlId: String
})

const vueFlowContent = ref<string>();
const {
  addNodes,
  addEdges,
  getNode,
  getTransform,
  setTransform,
  fitView,
  panOnDrag,
  setInteractive
} = useVueFlow({
  id: props.controlId,
  panOnDrag: false,
  nodesDraggable: false,
  nodesConnectable: false
})

onMounted(() => {
  vueFlowContent.value = '#orange-min-map-control'
})

// vueFlow 操作栏
const vueFlowControl = {
  zoom: ref<number>(1),
  lock: ref<boolean>(true),
  map: ref<boolean>(false),
  full: ref<boolean>(false),
  shrink: ref<boolean>(true),
  // 设置缩放
  setZoom: (zoom: number) => {
    const {x, y} = getTransform();
    setTransform({x, y, zoom});
    vueFlowControl.zoom.value = zoom;
  },
  // 适应全部
  setFitView: () => {
    fitView();
    setTimeout(() => {
      const {zoom} = getTransform();
      vueFlowControl.zoom.value = zoom;
    })
  },
  // 锁定
  setLock: (isLock: boolean) => {
    vueFlowControl.lock.value = isLock;
    panOnDrag.value = !isLock;
    setInteractive(!isLock);
  },
  // 配置
  
}

// 收缩节点
function shrinkNode(node:GraphNode , direction: string) {
  
}

// 添加节点
function addNode(node:GraphNode , direction: string) {
  console.log(node, direction)
  const {id: sourceId, position: {x, y}, dimensions: {width}} = node;
  const targetId =  rnd();
  console.log(getNode(node.id))
  addNodes([
    {
      id: targetId,
      type: 'custom',
      label: '新添加',
      position: {
        x: direction === 'left' ? x - 100 - width : x + width + 100,
        y: y
      },
      data: {
        type: 'default'
      }
    }
  ])
  
  nextTick(() => {
    const connectId = rnd();
    addEdges([
      {
        id: connectId,
        source: sourceId,
        target: targetId,
        sourceHandle: direction,
        targetHandle: direction === 'left' ? 'right': 'left',
        style: {stroke: '#f00', strokeWidth: '2px'}
      }
    ])
  })
}


</script>

<style lang="less">
@import "../../styles/dark.less";

.vue-flow-panel {
  height: 100%;
  position: relative;
  
  .vue-flow__node {
    user-select: all !important;
    
    > .mind-node {
      min-width: 170px;
      
      > .node-content {
        width: 100%;
        height: 100%;
        padding: 5px 20px;
        box-shadow: 0 0 0 2px #fff;
        box-sizing: border-box;
        position: relative;
        
        &.default {
          border-radius: 18px;
        }
        
        &.node-active > .node-handle {
          display: flex;
        }
        
        > .node-editor {
          width: 100%;
          height: 100%;
          line-height: 26px;
          user-select: all;
        }
        
        > .node-handle {
          display: none;
          height: 20px;
          //border: 1px solid #f1f1f1;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          gap: 2px;
          align-items: center;
          
          &.handle-left {
            left: -5px;
            transform: translate(-100%, -50%);
            flex-direction: row-reverse;
          }
          
          &.handle-right {
            right: -5px;
            transform: translate(100%, -50%);
          }
          
          > .shrink, > .add-node {
            padding: 2px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
          }
        }
      }
      
      > .node-active {
      
      }
      
      > .vue-flow__handle {
        opacity: 0;
      }
    }
  }
  
  > .flow-chart-control {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px;
    border-radius: 3px;
    background-color: #fff;
    z-index: 1000;
    display: flex;
    
    > .control-item {
      display: flex;
      gap: 10px;
      align-items: center;
      color: #333;
      padding: 0 3px;
      
      &:not(:nth-last-child(1)) {
        border-right: 1px solid #d9d9da;
      }
      
      > .orange-icon {
        padding: 5px;
        cursor: pointer;
        
        &:hover {
          background-color: fadeout(#2e9cfe, 70%);
        }
      }
      
      > .zoom-input {
        user-select: none;
        word-break: keep-all;
        padding: 3px 5px;
        font-family: "JetBrains Mono Light", serif;
        cursor: pointer;
        
        &:hover {
          background-color: fadeout(#2e9cfe, 70%);
        }
      }
    }
  }
}

.orange-mind-map-control {
  width: 100%;
  min-height: 300px;
  height: 300px;
  background-color: @control-bg-color;
  position: relative;
  
  &:empty:after {
    content: attr(data-placeholder);
    font-size: 24px;
    font-weight: bolder;
    color: fadeout(@main-font-color, 30%);
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    cursor: pointer;
  }
  
  > .flow-chart-wrap {
    .vue-flow-panel();
  }
}

.vue-flow-control-popper {
  background-color: #fff !important;
  padding: 0 !important;
  
  .zoom-popper {
    padding: 10px;
    
    > .command-item {
      display: flex;
      justify-content: space-between;
      line-height: 20px;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      
      &:nth-child(-n+3):hover {
        background-color: fadeout(@aside-bg-color, 95%);
      }
      
      > :nth-last-child(1) {
        color: fadeout(@main-font-dark-color, 30%);
      }
    }
  }
  
  > .map-popper {
    position: relative;
    height: 150px;
    overflow: hidden;
    
    > .vue-flow__panel {
      margin: 0;
    }
    
    & {
      padding: 0;
    }
  }
}

#full-screen-content {
  background-color: #1a1a1a !important;
  
  > .flow-chart-wrap {
    background-color: @control-bg-color;
    .vue-flow-panel();
  }
}
</style>
