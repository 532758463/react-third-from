export const CssBox = () => {
  return (
    <div className="flex justify-around">
      <div
        className="bg-red-500"
        style={{
          boxSizing: 'border-box',
          width: '350px',
          height: '80px',
          padding: '15px',
          border: '15px solid #ccc'
        }}
      >
        border-box: width设置的是包含了border + padding
      </div>
      <div
        className="bg-red-600 border-cyan-400"
        style={{
          boxSizing: 'content-box',
          width: '350px',
          height: '80px',
          padding: '15px',
          border: '15px solid #ccc'
        }}
      >
        content-box: 设置的width就只是content内容的宽度，所以最终盒子的宽度 =
        width + padding + border
      </div>
    </div>
  );
};

export default CssBox;
