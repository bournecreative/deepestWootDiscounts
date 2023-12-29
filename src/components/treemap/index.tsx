import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { WootItem } from '../../pages/Home';
import './treemap-module.scss';

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
        nodePaddingOuter: 5,
        nodePaddingInner: 7,
      }),
    );

    series.labels.template.setAll({
      fontSize: 12,
      text: '${value}',
    });

    series.rectangles.template.setAll({
      stroke: am5.color(0x141414),
    });

    if (sortedData?.children[0].children.length) {
      series.rectangles.template.adapters.add('fill', function (_, target) {
        const value = (target.dataItem?.dataContext as chartDataObj).value;
        const topSavings = sortedData?.children[0].children[0].value;
        const higher = topSavings * 0.75;
        const mid = topSavings * 0.5;
        const low = topSavings * 0.25;
        const lowest = topSavings * 0.15;
        if (value >= higher) {
          return am5.color(0x0442bf);
        } else if (value >= mid) {
          return am5.color(0x0597f2);
        } else if (value >= low) {
          return am5.color(0xf2cb05);
        } else if (value >= lowest) {
          return am5.color(0xd96704);
        } else {
          return am5.color(0x04bf9d);
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

  return <div className="chart_treepMap" ref={rootRef} id={elementId}></div>;
};
