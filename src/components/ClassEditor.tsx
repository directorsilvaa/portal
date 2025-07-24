import React, { useState, useRef, useCallback } from "react";
import {
  Save,
  X,
  FileText,
  Video,
  Eye,
  Bold,
  Italic,
  List,
  Link,
  Type,
  Code,
} from "lucide-react";

// Simulando tipos para o exemplo
interface Class {
  id?: string;
  title: string;
  description: string;
  type: "video" | "text";
  courseId: string;
  videoUrl?: string;
  textContent?: string;
  videoFile?: File;
  createdAt?: Date;
}

interface ClassEditorProps {
  classData?: Class;
  courseId: string;
  onSave: (classData: Omit<Class, "id" | "createdAt">) => void;
  onCancel: () => void;
  newClass?: any;
  setNewClass?: any;
  courses?: Array<{ _id: string; name: string }>;
}

export default function ClassEditor({
  classData,
  courseId,
  onSave,
  onCancel,
  newClass,
  setNewClass,
  courses = [],
}: ClassEditorProps) {
  const [title, setTitle] = useState(classData?.title || "");
  const [description, setDescription] = useState(classData?.description || "");
  const [type, setType] = useState<"video" | "text">(
    classData?.type || "video"
  );
  const [videoUrl, setVideoUrl] = useState(classData?.videoUrl || "");
  const [textContent, setTextContent] = useState(classData?.textContent || "");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");
  
  // Estado para o editor visual - inicializa com exemplo se não há dados
  const [visualContent, setVisualContent] = useState(() => {
    if (classData?.textContent) {
      return htmlToVisual(classData.textContent);
    }
    // Texto de exemplo para demonstração
    return `## Karl Marx: Pensador Revolucionário

Karl Marx (1818-1883) foi um filósofo, economista e sociólogo alemão, conhecido como um dos fundadores do socialismo moderno e do comunismo. Suas ideias revolucionárias, expressas em obras como **"O Capital"** e **"O Manifesto Comunista"**, criticaram o capitalismo e propuseram a luta de classes como motor da mudança social.

### A Teoria da Luta de Classes

Marx argumentou que a história da sociedade é a história da luta de classes, onde os interesses dos **proletários** (trabalhadores) frequentemente entram em conflito com os da **burguesia** (capitalistas). Ele acreditava que o capitalismo, ao explorar o trabalho dos proletários, geraria suas próprias contradições e, eventualmente, levaria à sua queda.

### Principais Contribuições

• Análise crítica do sistema capitalista
• Teoria do valor-trabalho
• Conceito de mais-valia
• Materialismo histórico

### Legado e Influência

A influência de Marx se estende além da economia e da política, impactando diversas áreas como a filosofia, a sociologia e a teoria crítica. Suas ideias continuam a ser debatidas e reinterpretadas em contextos contemporâneos.

Para mais informações, consulte [Obras Completas de Marx](https://exemplo.com/marx).`;
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const visualEditorRef = useRef<HTMLTextAreaElement>(null);

  // Converte HTML para formato visual amigável
  function htmlToVisual(html: string): string {
    if (!html) return "";
    
    return html
      .replace(/<h2>(.*?)<\/h2>/g, "## $1")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1")
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      .replace(/<ul><li>/g, "• ")
      .replace(/<\/li><li>/g, "\n• ")
      .replace(/<\/li><\/ul>/g, "")
      .replace(/<ol><li>/g, "1. ")
      .replace(/<\/li><\/ol>/g, "")
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      .replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)")
      .replace(/<br\s*\/?>/g, "\n")
      .trim();
  }

  // Converte formato visual para HTML
  function visualToHtml(visual: string): string {
    if (!visual) return "";
    
    const lines = visual.split('\n');
    let html = '';
    let inList = false;
    let listItems: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      if (line === '') {
        // Finalizar lista se estiver aberta
        if (inList) {
          html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
          listItems = [];
          inList = false;
        }
        continue;
      }
      
      // Títulos
      if (line.startsWith('### ')) {
        if (inList) {
          html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
          listItems = [];
          inList = false;
        }
        html += `<h3>${formatInlineText(line.substring(4))}</h3>\n`;
      } else if (line.startsWith('## ')) {
        if (inList) {
          html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
          listItems = [];
          inList = false;
        }
        html += `<h2>${formatInlineText(line.substring(3))}</h2>\n`;
      }
      // Lista
      else if (line.startsWith('• ')) {
        const itemText = line.substring(2);
        listItems.push(formatInlineText(itemText));
        inList = true;
      }
      // Lista numerada
      else if (/^\d+\.\s/.test(line)) {
        if (inList) {
          html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
          listItems = [];
          inList = false;
        }
        const itemText = line.replace(/^\d+\.\s/, '');
        html += `<ol><li>${formatInlineText(itemText)}</li></ol>\n`;
      }
      // Parágrafo normal
      else {
        if (inList) {
          html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
          listItems = [];
          inList = false;
        }
        html += `<p>${formatInlineText(line)}</p>\n`;
      }
    }
    
    // Finalizar lista se ainda estiver aberta
    if (inList) {
      html += `<ul>${listItems.map(item => `<li>${item}</li>`).join('')}</ul>\n`;
    }
    
    return html.trim();
  }

  // Formatar texto inline (negrito, itálico, links)
  function formatInlineText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const insertVisualFormat = useCallback((format: string) => {
    const textarea = visualEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = visualContent.substring(start, end);
    
    let replacement = "";
    let cursorOffset = 0;

    switch (format) {
      case "bold":
        replacement = selectedText ? `**${selectedText}**` : "**texto em negrito**";
        cursorOffset = selectedText ? 0 : -2;
        break;
      case "italic":
        replacement = selectedText ? `*${selectedText}*` : "*texto em itálico*";
        cursorOffset = selectedText ? 0 : -1;
        break;
      case "h2":
        replacement = selectedText ? `## ${selectedText}` : "## Título H2";
        cursorOffset = selectedText ? 0 : -12;
        break;
      case "h3":
        replacement = selectedText ? `### ${selectedText}` : "### Título H3";
        cursorOffset = selectedText ? 0 : -13;
        break;
      case "list":
        if (selectedText) {
          const lines = selectedText.split('\n');
          replacement = lines.map(line => line.trim() ? `• ${line.trim()}` : '').join('\n');
        } else {
          replacement = "• Item da lista";
          cursorOffset = -14;
        }
        break;
      case "link":
        const url = prompt("Digite a URL:");
        if (url) {
          replacement = selectedText ? `[${selectedText}](${url})` : `[texto do link](${url})`;
          cursorOffset = selectedText ? 0 : -15;
        }
        break;
    }

    if (replacement) {
      const newContent = 
        visualContent.substring(0, start) + 
        replacement + 
        visualContent.substring(end);
      
      setVisualContent(newContent);
      
      // Reposicionar cursor
      setTimeout(() => {
        if (textarea) {
          const newPosition = start + replacement.length + cursorOffset;
          textarea.setSelectionRange(newPosition, newPosition);
          textarea.focus();
        }
      }, 10);
    }
  }, [visualContent]);

  const handleSubmit = () => {
    // Converter conteúdo visual para HTML se estiver no modo visual
    const finalTextContent = editorMode === "visual" 
      ? visualToHtml(visualContent)
      : textContent;

    const classData: Omit<Class, "id" | "createdAt"> = {
      title,
      description,
      type,
      courseId: newClass?.courseId || courseId,
      ...(type === "video" ? { videoUrl, videoFile } : { textContent: finalTextContent }),
    };

    onSave(classData);
  };

  // Sincronizar mudanças entre modos
  const handleModeSwitch = (newMode: "visual" | "html") => {
    if (newMode === "html" && editorMode === "visual") {
      // Convertendo de visual para HTML
      setTextContent(visualToHtml(visualContent));
    } else if (newMode === "visual" && editorMode === "html") {
      // Convertendo de HTML para visual
      setVisualContent(htmlToVisual(textContent));
    }
    setEditorMode(newMode);
  };

  // Processar mudanças no editor visual
  const handleVisualContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVisualContent(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {classData ? "Editar Aula" : "Nova Aula"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(95vh-80px)]">
          <div className="p-6 space-y-6 flex-shrink-0">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Aula
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o título da aula"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Aula
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "video" | "text")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="video">Vídeo Aula</option>
                  <option value="text">Aula em Texto</option>
                </select>
              </div>

              {newClass && setNewClass && courses.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curso
                  </label>
                  <select
                    value={newClass.courseId || courseId}
                    onChange={(e) =>
                      setNewClass({
                        ...newClass,
                        courseId: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um curso</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o conteúdo da aula"
              />
            </div>
          </div>

          {/* Content Section - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6">
            {type === "video" ? (
              <div className="space-y-4 pb-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Conteúdo em Vídeo</h3>
                    <p className="text-sm text-blue-700">
                      Faça upload de um arquivo MP4 ou cole uma URL do YouTube/Vimeo
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Vídeo (YouTube/Vimeo)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                {videoUrl && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Preview do Vídeo:</h4>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                        <iframe
                          src={videoUrl.replace("watch?v=", "embed/")}
                          className="w-full h-full"
                          allowFullScreen
                          title="Video Preview"
                        />
                      ) : videoUrl.includes("vimeo.com") ? (
                        <iframe
                          src={videoUrl.replace("vimeo.com/", "player.vimeo.com/video/")}
                          className="w-full h-full"
                          allowFullScreen
                          title="Video Preview"
                        />
                      ) : (
                        <video src={videoUrl} controls className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 pb-6">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Editor de Conteúdo Inteligente</h3>
                    <p className="text-sm text-green-700">
                      Digite naturalmente - o editor reconhece formatação automática
                    </p>
                  </div>
                </div>

                {/* Editor Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => handleModeSwitch("visual")}
                      className={`px-4 py-2 rounded-md transition-all flex items-center space-x-2 ${
                        editorMode === "visual"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Type className="h-4 w-4" />
                      <span>Visual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModeSwitch("html")}
                      className={`px-4 py-2 rounded-md transition-all flex items-center space-x-2 ${
                        editorMode === "html"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Code className="h-4 w-4" />
                      <span>HTML</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`px-4 py-2 rounded-md transition-all flex items-center space-x-2 ${
                        previewMode
                          ? "bg-white shadow-sm text-green-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {!previewMode && (
                  <>
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("bold")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Negrito (**texto**)"
                      >
                        <Bold className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("italic")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Itálico (*texto*)"
                      >
                        <Italic className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("h2")}
                        className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-semibold"
                        title="Título H2 (## texto)"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("h3")}
                        className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-semibold"
                        title="Título H3 (### texto)"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("list")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Lista (• item)"
                      >
                        <List className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertVisualFormat("link")}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Link ([texto](url))"
                      >
                        <Link className="h-4 w-4" />
                      </button>
                    </div>

                    {editorMode === "visual" ? (
                      <div className="space-y-2">
                        <textarea
                          ref={visualEditorRef}
                          value={visualContent}
                          onChange={handleVisualContentChange}
                          className="w-full min-h-[500px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-mono text-sm leading-relaxed resize-none"
                          placeholder="Digite o conteúdo da aula...

Formatação automática:
## Título H2
### Título H3
**texto em negrito**
*texto em itálico*
• Item de lista
[texto do link](https://exemplo.com)

Digite naturalmente - o editor entende sua formatação!"
                          style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                        />
                        <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                          <strong>💡 Dicas de Formatação:</strong> Use ## para títulos H2, ### para H3, **negrito**, *itálico*, • para listas, [texto](url) para links. O texto comum vira parágrafo automaticamente!
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          ref={textareaRef}
                          value={textContent}
                          onChange={(e) => setTextContent(e.target.value)}
                          required
                          rows={25}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                          placeholder="Digite o conteúdo da aula usando HTML..."
                          style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                        />
                        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                          <strong>Modo HTML:</strong> Use tags HTML como &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;
                        </div>
                      </div>
                    )}
                  </>
                )}

                {previewMode && (
                  <div className="border border-gray-300 rounded-lg p-6 min-h-[500px] bg-white">
                    <div
                      className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-em:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-h2:text-xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-3 prose-p:mb-4 prose-ul:mb-4 prose-li:mb-1"
                      dangerouslySetInnerHTML={{
                        __html: editorMode === "visual" ? visualToHtml(visualContent) : textContent
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{classData ? "Atualizar" : "Salvar"} Aula</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}