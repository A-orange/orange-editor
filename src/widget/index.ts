import CodeEditorControl from "@/widget/CodeEditor/CodeEditor.vue";
import TitleControl from "@/widget/title/Title.vue";
import TodoControl from "@/widget/todo/Todo.vue";
import TodoProControl from "@/widget/todo/TotoPro.vue";
import UlControl from "@/widget/list/Ul.vue";
import OlControl from "@/widget/list/Ol.vue";
import CollapseControl from "@/widget/collapse/Collapse.vue";
import QuoteControl from "@/widget/quote/Quote.vue";
import DividerControl from "@/widget/divider/Divider.vue";
import MindMapControl from "@/widget/MindMap/MindMap.vue";

export const widgetComponent = {
  'title': TitleControl,
  'codeEditor': CodeEditorControl,
  'todo': TodoControl,
  'todoPro': TodoProControl,
  'ul': UlControl,
  'ol': OlControl,
  'collapse': CollapseControl,
  'quote': QuoteControl,
  'divider': DividerControl,
  'mindMap': MindMapControl,
}