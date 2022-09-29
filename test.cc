#include <node.h>
#include <string>
#include <iostream>

namespace demo {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::ObjectTemplate;
using v8::Utils;
using v8::NewStringType;
using v8::Exception;
using v8::MaybeLocal;
using v8::Maybe;
using v8::PropertyAttribute;
using v8::Array;
using v8::Number;


static void ReturnThis(const v8::FunctionCallbackInfo<v8::Value>& args) {
  Isolate* iso = args.GetIsolate();
  Local<Context> ctx = iso->GetCurrentContext();
  Local<Object> obj = args.This()->ToObject(ctx).ToLocalChecked();

  Local<Value> arg = args[0];
  Local<Value> key_local;
  if (arg->IsNumber()){
    key_local = arg->ToNumber(ctx).ToLocalChecked();
  }
  else {
    key_local = arg->ToString(ctx).ToLocalChecked();
  }
  Local<Value> val_local = obj->Get(ctx, key_local).ToLocalChecked();
  args.GetReturnValue().Set(val_local);
}

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  Local<v8::ObjectTemplate> desc = v8::ObjectTemplate::New(isolate);
  desc->MarkAsUndetectable();
  desc->SetCallAsFunctionHandler(ReturnThis);
  Local<v8::Object> obj = desc->NewInstance(isolate->GetCurrentContext()).ToLocalChecked();
  args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo