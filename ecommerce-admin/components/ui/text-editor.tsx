'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BaseHeading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { mergeAttributes } from '@tiptap/core';
import { Toggle } from '@/components/ui/toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  BoldIcon,
  ChevronsUpDownIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

type Levels = 1 | 2 | 3;

const classes: Record<Levels, string> = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-bold',
};

export const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${classes[level]}`,
      }),
      0,
    ];
  },
});

interface TextEditorProps {
  description: string | null;
  onChange: (richText: string) => void;
  placeholder: string | undefined;
  disable?: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  description,
  onChange,
  placeholder,
  disable = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Heading,
      Paragraph,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-6',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-6',
        },
      }),
    ],
    editable: !disable,
    editorProps: {
      attributes: {
        class: 'min-h-[200px] px-3 py-2 text-sm focus-visible:outline-none',
      },
    },
    content: description,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div
      className={cn(
        'border border-input rounded-md',
        disable && 'opacity-50 cursor-not-allowed select-none'
      )}
    >
      <Toolbar editor={editor} disable={disable} />
      <EditorContent editor={editor} />
    </div>
  );
};

interface ToolbarProps {
  editor: Editor | null;
  disable?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, disable = false }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center border-b">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'ghost'}
            className="w-[100px] items-center px-3 text-xs"
            disabled={disable}
          >
            {editor.isActive('heading', { level: 1 })
              ? 'Heading 1'
              : editor.isActive('heading', { level: 2 })
              ? 'Heading 2'
              : editor.isActive('heading', { level: 3 })
              ? 'Heading 3'
              : 'Normal'}
            <ChevronsUpDownIcon className="w-4 h-4 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                  }}
                >
                  <h1 className={cn('text-2xl font-bold')}>Heading 1</h1>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                  }}
                >
                  <h2 className="text-xl font-bold">Heading 2</h2>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                  }}
                >
                  <h3 className="text-lg font-bold">Heading 3</h3>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    editor.chain().focus().setParagraph().run();
                  }}
                >
                  <p>Normal</p>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Toggle
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-state={editor.isActive('bold') ? 'on' : 'off'}
        disabled={disable}
      >
        <BoldIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-state={editor.isActive('italic') ? 'on' : 'off'}
        disabled={disable}
      >
        <ItalicIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        data-state={editor.isActive('underline') ? 'on' : 'off'}
        disabled={disable}
      >
        <UnderlineIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        data-state={editor.isActive('bulletList') ? 'on' : 'off'}
        disabled={disable}
      >
        <ListIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-state={editor.isActive('orderedLis') ? 'on' : 'off'}
        disabled={disable}
      >
        <ListOrderedIcon className="w-4 h-4" />
      </Toggle>
    </div>
  );
};
