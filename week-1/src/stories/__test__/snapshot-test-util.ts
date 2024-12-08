/**
 * @docs storybook https://storybook.js.org/docs/writing-tests/snapshot-testing/snapshot-testing#snapshot-tests-with-portable-stories
 * * Portable Stories를 사용한 스냅샷 테스트
 */
import type { Meta, StoryFn } from '@storybook/react';
import path from 'path';
import { composeStories } from '@storybook/react';

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

export const compose = (
  entry: StoryFile
): ReturnType<typeof composeStories<StoryFile>> => {
  try {
    return composeStories(entry);
  } catch (e) {
    throw new Error(
      `There was an issue composing stories for the module: ${JSON.stringify(entry)}, ${e}`
    );
  }
};

export function getAllStoryFiles() {
  // Place the glob you want to match your story files
  const storyFiles = Object.entries(
    import.meta.glob<StoryFile>(
      '../**/*.(stories|story).@(js|jsx|mjs|ts|tsx)',
      {
        eager: true,
      }
    )
  );
  return storyFiles.map(([filePath, storyFile]) => {
    const storyDir = path.dirname(filePath);
    const componentName = path
      .basename(filePath)
      .replace(/\.(stories|story)\.[^/.]+$/, '');
    return { filePath, storyFile, componentName, storyDir };
  });
}
