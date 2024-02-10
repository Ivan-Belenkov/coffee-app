import type { ITagService } from 'src/container/interfaces';
import { injectable } from 'inversify';
import type { CoffeeTag } from 'src/store/types';
import { getUniqueArray, strToHexColor } from 'src/utils/utils';

@injectable()
export class TagService implements ITagService {
  private tags = new Map<string, CoffeeTag>();
  private latestTagId = 0;

  create(tagString: string): CoffeeTag[] {
    if (!tagString) return [];
    const tagStringArr = tagString.split(',').map((tag) => tag.trim());
    return getUniqueArray(tagStringArr).map((tag) => this.generateTag(tag));
  }

  private generateTag(tag: string): CoffeeTag {
    if (!this.tags.has(tag)) {
      this.tags.set(tag, {
        id: ++this.latestTagId,
        text: tag,
        color: this.getColor(tag)
      });
    }
    return this.tags.get(tag)!;
  }

  private getColor(tag: string): string {
    return strToHexColor(tag);
  }
}
