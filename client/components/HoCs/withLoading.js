export default  withLoading = (Component) => (props) =>
<div>
  <Component {...props} />

  <div className="interactions">
    {props.isLoading && <span>Loading...</span>}
  </div>
</div>