import React, { useMemo } from 'react';
import classNames from 'classnames';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { humanizeCompositionId } from '@teambit/model.composition-id';
import { CompositionType } from '@teambit/model.composition-type';
import { Card } from '@teambit/base-ui.surfaces.card';
import { colorPalette } from '@teambit/base-ui.theme.color-palette';
import { themedText } from '@teambit/base-ui.text.themed-text';
import styles from './composition-card.module.scss';

export type CompositionCardProps = {
  Composition: CompositionType;
  name: string;
};

export function CompositionCard({ Composition, name }: CompositionCardProps) {
  const { canvas } = Composition;

  const humanizedName = useMemo(() => humanizeCompositionId(name), [name]);

  return (
    <Card elevation="low" className={classNames(styles.compositionCard)}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div style={canvas} className={styles.compositionContainer}>
          <Composition />
        </div>
      </ErrorBoundary>
      <div className={classNames(styles.title, colorPalette.emphasized, themedText)}>{humanizedName}</div>
    </Card>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.error(error);

  return (
    <div
      style={{
        height: '100%',
        border: '4px solid #f086a0',
        borderRadius: '4px 4px 0 0',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      Failed to render 😨
      <br />
      <button onClick={resetErrorBoundary}>retry</button>
    </div>
  );
}
