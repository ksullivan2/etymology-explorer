import React from 'react';

function Node({ node }) {
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  if (isRoot) return <RootNode node={node} />;

  return (
    <Group top={node.y} left={node.x}>
      {node.depth !== 0 && (
        <circle
          r={12}
          fill={bg}
          stroke={isParent ? white : citrus}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.name)}`);
          }}
        />
      )}
      <text
        dy={'.33em'}
        fontSize={9}
        fontFamily="Arial"
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={isParent ? white : citrus}
      >
        {node.data.name}
      </text>
    </Group>
  );
}