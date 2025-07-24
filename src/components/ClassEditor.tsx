import React, { useState, useRef } from "react";
import { Class } from "../types";
import {
  Save,
  X,
  Upload,
  FileText,
  Video,
  Eye,
  Bold,
  Italic,
  List,
  Link,
} from "lucide-react";

interface ClassEditorProps {
  classData?: Class;
  courseId: string;
  onSave: (classData: Omit<Class, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function ClassEditor({
  classData,
  courseId,
  onSave,
  onCancel,
  newClass,
  setNewClass,
  courses
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      // In a real app, you would upload this to a server and get a URL
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const insertTextFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textContent.substring(start, end);

    let replacement = "";
    switch (format) {
      case "bold":
        replacement = `<strong>${selectedText}</strong>`;
        break;
      case "italic":
        replacement = `<em>${selectedText}</em>`;
        break;
      case "h2":
        replacement = `<h2>${selectedText}</h2>`;
        break;
      case "h3":
        replacement = `<h3>${selectedText}</h3>`;
        break;
      case "ul":
        replacement = `<ul><li>${selectedText}</li></ul>`;
        break;
      case "p":
        replacement = `<p>${selectedText}</p>`;
        break;
      case "link":
        const url = prompt("Digite a URL:");
        if (url) replacement = `<a href="${url}">${selectedText}</a>`;
        break;
    }

    if (replacement) {
      const newContent =
        textContent.substring(0, start) +
        replacement +
        textContent.substring(end);
      setTextContent(newContent);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const classData: Omit<Class, "id" | "createdAt"> = {
      title,
      description,
      type,
      courseId,
      ...(type === "video" ? { videoUrl, videoFile } : { textContent }),
    };

    onSave(classData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
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

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Curso
                </label>
                <select
                  value={newClass.courseId}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      courseId: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
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

            {/* Content based on type */}
            {type === "video" ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Video className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Conteúdo em Vídeo
                    </h3>
                    <p className="text-sm text-blue-700">
                      Faça upload de um arquivo MP4 ou cole uma URL do
                      YouTube/Vimeo
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload de Vídeo (.mp4)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4"
                        onChange={handleVideoFileChange}
                        className="hidden"
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clique para fazer upload
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        Apenas arquivos MP4 são aceitos
                      </p>
                      {videoFile && (
                        <p className="text-sm text-green-600 mt-2">
                          ✓ {videoFile.name}
                        </p>
                      )}
                    </div>
                  </div> */}

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
                </div>

                {videoUrl && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Preview do Vídeo:
                    </h4>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {videoUrl.includes("youtube.com") ||
                      videoUrl.includes("youtu.be") ? (
                        <iframe
                          src={videoUrl.replace("watch?v=", "embed/")}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : videoUrl.includes("vimeo.com") ? (
                        <iframe
                          src={videoUrl.replace(
                            "vimeo.com/",
                            "player.vimeo.com/video/"
                          )}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">
                      Conteúdo em Texto
                    </h3>
                    <p className="text-sm text-green-700">
                      Escreva o conteúdo da aula usando HTML básico
                    </p>
                  </div>
                </div>

                {/* Text Editor Toolbar */}
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
                  <button
                    type="button"
                    onClick={() => insertTextFormat("bold")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Negrito"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextFormat("italic")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Itálico"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextFormat("h2")}
                    className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-medium"
                    title="Título H2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextFormat("h3")}
                    className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm font-medium"
                    title="Título H3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextFormat("ul")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Lista"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextFormat("link")}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Link"
                  >
                    <Link className="h-4 w-4" />
                  </button>
                  <div className="border-l border-gray-300 h-6 mx-2"></div>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`p-2 rounded transition-colors flex items-center space-x-1 ${
                      previewMode
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-200"
                    }`}
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Preview</span>
                  </button>
                </div>

                {previewMode ? (
                  <div className="border border-gray-300 rounded-lg p-4 min-h-[300px] bg-white">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: textContent }}
                    />
                  </div>
                ) : (
                  <textarea
                    ref={textareaRef}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    required
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Digite o conteúdo da aula usando HTML básico..."
                  />
                )}

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <strong>Dica:</strong> Use tags HTML básicas como &lt;h2&gt;,
                  &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;,
                  &lt;li&gt;, &lt;a&gt; para formatar o conteúdo.
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{classData ? "Atualizar" : "Salvar"} Aula</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
