// this option doesn't mess up export names wasm module
#[no_mangle]
pub extern fn squarer(n: i32) -> i32 {
    n * n
}