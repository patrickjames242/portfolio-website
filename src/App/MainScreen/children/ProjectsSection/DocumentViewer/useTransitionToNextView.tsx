import uniqueId from 'lodash/uniqueId';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';

export interface TransitionToNextViewRenderFnProps<ItemT> {
  item: ItemT;
  isShown: boolean;
  isFinishedExiting: () => void;
}

export interface TransitionToNextViewConfig<ItemT> {
  initialItem: ItemT | null;
  RenderFn: FC<TransitionToNextViewRenderFnProps<ItemT>>;
}

export type TransitionToNextViewReturnValue<ItemT> = {
  content: ReactNode;
  transition: (newItem: ItemT | null) => void;
};

export function useTransitionToNextView<ItemT>({
  RenderFn,
  initialItem,
}: TransitionToNextViewConfig<ItemT>): TransitionToNextViewReturnValue<ItemT> {
  interface ItemState {
    id: string;
    item: ItemT;
  }

  interface ItemsState {
    oldItem: ItemState | null;
    newItem: ItemState | null;
  }

  const initialItemState = useMemo<ItemsState>(() => {
    return {
      oldItem: null,
      newItem: initialItem ? { id: uniqueId(), item: initialItem } : null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [itemsState, setItemsState] = useState<ItemsState>(initialItemState);

  const oldItemIsFinishedExiting = useCallback(() => {
    setItemsState((prev) => {
      if (itemsState.oldItem && prev.oldItem?.id === itemsState.oldItem?.id) {
        return { ...prev, oldItem: null };
      }
      return prev;
    });
  }, [itemsState.oldItem]);

  const newItemIsFinishedExiting = useCallback(() => {
    throw new Error('isFinishedExiting called when item not exiting');
  }, []);

  const content = useMemo(() => {
    return (
      <>
        {itemsState.oldItem && (
          <RenderFn
            key={itemsState.oldItem.id}
            item={itemsState.oldItem.item}
            isShown={false}
            isFinishedExiting={oldItemIsFinishedExiting}
          />
        )}
        {itemsState.newItem && (
          <RenderFn
            key={itemsState.newItem.id}
            item={itemsState.newItem.item}
            isShown={true}
            isFinishedExiting={newItemIsFinishedExiting}
          />
        )}
      </>
    );
  }, [
    RenderFn,
    itemsState.newItem,
    itemsState.oldItem,
    newItemIsFinishedExiting,
    oldItemIsFinishedExiting,
  ]);

  const transition = useCallback((newItem: ItemT | null): void => {
    setItemsState((prev) => ({
      oldItem: prev.newItem,
      newItem: newItem ? { id: uniqueId(), item: newItem } : null,
    }));
  }, []);

  return useMemo(() => ({ content, transition }), [content, transition]);
}
