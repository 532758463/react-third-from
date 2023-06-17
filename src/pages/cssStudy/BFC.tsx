const BFC = () => {
  return (
    <>
      <div className="flow-root bg-violet-300 border-8 border-violet-500">
        <div className="float-left text-xl h-40 p-5 border-2 border-black bg-white">
          I am a floated box!
        </div>
        <p className="text-xl">I am content inside the container.</p>
      </div>
      <p className="break-words text-xl text-left font-medium indent-3">
        使用 overflow 创建新的 BFC 的问题在于， overflow
        属性用于告诉浏览器您希望如何处理溢出的内容。在某些情况下，当您纯粹使用此属性创建
        BFC
        时，您会发现不需要的滚动条或剪切阴影。另外，对于未来的开发人员来说，它可能不太可读，因为不能显式地表明为什么要使用溢出来实现这一目的。如果您使用了这个方法，最好对代码进行注释以便他人理解。
      </p>
      <p className="break-words text-xl text-left font-medium indent-3">
        使用 display: flow-root （或 display: flow-root
        list-item）将创建一个新的 BFC，而不会产生任何其他潜在的问题副作用。
      </p>
      <h2 className="text-left text-2xl">行内格式化上下文</h2>
      <p className="break-words text-xl text-left font-medium indent-3">
        内联格式上下文存在于其他格式上下文中，可以将其视为段落的上下文。段落创建了一个内联格式上下文，其中在文本中使用诸如
        strong、a或 span 元素等内容。 box model
        不完全适用于参与内联格式上下文。在水平书写模式行中，水平填充、边框和边距将应用于元素，并左右移动文本。但是，元素上方和下方边距将不适用。应用垂直填充和边框可能会在内容的上方和下方重叠，因为在内联格式上下文中，填充和边框不会将行框撑开。
      </p>

      <h2 className="text-left  text-xl">开启BFC</h2>
      <ul className="break-words text-xl text-left font-medium indent-3">
        除了文档的根元素html 之外，还将在以下情况下创建一个新的 BFC：
        <li>
          1. 使用float使其浮动的元素 绝对定位的元素 包含 position: fixed
          或position: sticky
        </li>
        <li>
          2. 使用以下属性的元素 display: inline-block 表格单元格或使用 display:
          table-cell, 包括使用 display: table-* 属性的所有表格单元格
        </li>
        <li>3. 表格标题或使用 display: table-caption 的元素</li>
        <li>4. 块级元素的 overflow 属性不为 visible</li>
        <li>
          5. 元素属性为 display: flow-root 或 display: flow-root list-item
        </li>
        <li>6. 元素属性为 contain: layout, content, 或 strict</li>
        <li>
          7.
          <a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Item">
            flex items
          </a>
        </li>
        <li>8. 网格布局元素</li>
        <li>
          9.
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Basic_Concepts_of_Multicol">
            multicol containers
          </a>
        </li>
        <li>10. 元素属性 column-span 设置为 all</li>
      </ul>
      <a
        href=" https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flow_Layout/Intro_to_formatting_contexts"
        className="text-xl text-left font-medium indent-3"
      >
        MDN
      </a>
    </>
  );
};

export default BFC;
