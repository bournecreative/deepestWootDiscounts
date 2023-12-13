import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { WootItem } from '../../pages/Home';

interface TreeMapProps {
  items: WootItem[];
  elementId: string;
}

interface chartDataObj {
  name: string;
  value: number;
}

interface Test {
  name: string;
  children: chartDataObj[];
}

interface chartData {
  name: string;
  children: Test[];
}

export const TreeMap: React.FC<TreeMapProps> = ({ items, elementId }) => {
  const [sortedData, setSortedData] = useState<chartData>();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(elementId);
    const myTheme = am5.Theme.new(root);

    myTheme.rule('HierarchyNode', ['depth0']).setAll({
      forceHidden: true,
    });

    myTheme.rule('HierarchyNode', ['depth1']).setAll({
      forceHidden: true,
    });

    root.setThemes([am5themes_Animated.new(root), myTheme]);

    const container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    );

    const series = container.children.push(
      am5hierarchy.Treemap.new(root, {
        singleBranchOnly: false,
        sort: 'descending',
        downDepth: 1,
        upDepth: -1,
        initialDepth: 2,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
        nodePaddingOuter: 0,
        nodePaddingInner: 0,
      }),
    );

    series.labels.template.setAll({
      fontSize: 12,
      text: '${value}',
    });

    series
      ?.get('colors')
      ?.set('colors', [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06),
      ]);

    if (sortedData?.children[0].children.length) {
      series.rectangles.template.adapters.add('fill', function (_, target) {
        const value = (target.dataItem?.dataContext as chartDataObj).value;
        const topSavings = sortedData?.children[0].children[0].value;
        const higher = topSavings * 0.75;
        const mid = topSavings * 0.5;
        const low = topSavings * 0.25;
        if (value <= low) {
          // console.log((target.dataItem?.dataContext as chartDataObj).value);
          return am5.color(0x00ccbf);
        } else if (value <= mid) {
          return am5.color(0x3f7c85);
        } else if (value <= higher) {
          return am5.color(0xff5f5d);
        } else {
          return am5.color(0x00ad76);
        }
      });

      series.data.setAll([sortedData]);
      series.set('selectedDataItem', series.dataItems[0]);
      series.appear(1000, 100);
    }

    return () => {
      root.dispose();
    };
  }, [sortedData, elementId]);

  useEffect(() => {
    const chartData: chartData = {
      name: 'Root',
      children: [{ name: 'top100', children: [] }],
    };

    for (let i = 0; i < items.length; i++) {
      const objData = {
        name: items[i].Title,
        value: Math.floor(Number(items[i].Savings)),
      };
      chartData.children[0].children.push(objData);
    }
    setSortedData(chartData);
  }, [items]);

  return (
    <div
      ref={rootRef}
      id={elementId}
      style={{ width: '100%', height: '100dvh' }}
    ></div>
  );
};
