# react-redux-snackbars

This library connects [notistack](https://github.com/iamhosseindhv/notistack) (multiple material-ui snackbars) with [redux](https://redux.js.org/) for managing these snackbars.

## API

### `<SnackbarProvider />` Component

|Prop|Description|
|---|---|
|`getSnackbarState`|provide a function to get the snackbar state (where you mounted the reducer)|
|`notistackOptions`|accepts the same props as [notistack's](https://iamhosseindhv.com/notistack/api#snackbarprovider)|
|`showDefaultDismissButton`|by default, include an `'X'` in the snackbar to dismiss|


### Redux Actions

|Action Type|Creator|Description|
|---|---|---|
|`@rrsnackbars/ENQUEUE_SNACKBAR`|`enqueueSnackbar(message: string, options?: OptionsObject)`|Enqueue a new snackbar (see [OptionsObject API](https://iamhosseindhv.com/notistack/api#enqueuesnackbar-options))|
|`@rrsnackbars/DISMISS_SNACKBAR`|`dismissSnackbar(snackbarKey: SnackbarKey)`|Dismiss a single snackbar with the given key|
|`@rrsnackbars/DISMISS_ALL_SNACKBARS`|`dismissAllSnackbars()`|Dismiss all snackbars|
|`@rrsnackbars/REMOVE_SNACKBAR`|N/A|(used internally) remove a snackbar from the store|

## Usage Examples

See `/example` for a working example.

### Provider setup
```jsx
    <React.StrictMode>
      <Provider store={store}>
        <SnackbarProvider
          getSnackbarState={(state: any) => state}
          showDefaultDismissButton={true}>
          <App />
        </SnackbarProvider>
      </Provider>
    </React.StrictMode>
```

### Enqueue a snackbar
```typescript
dispatch(enqueueSnackbar('Failed fetching data.', {
        key: shortid.generate(),
        variant: 'warning'
}))
```

## [TSDX Bootstrap User Guide](README-tsdx.md)