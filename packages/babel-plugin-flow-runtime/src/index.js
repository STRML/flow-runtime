/* @flow */

import createConversionContext from './createConversionContext';

import attachImport from './attachImport';
import firstPassVisitors from './firstPassVisitors';
import patternMatchVisitors from './patternMatchVisitors';
import transformVisitors from './transformVisitors';
import type {NodePath} from 'babel-traverse';


export default function () {
  return {
    visitor: {
      Program (path: NodePath, {opts}: Object) {
        const context = createConversionContext(opts || {});
        path.traverse(firstPassVisitors(context));
        if (context.shouldImport) {
          attachImport(context, path);
        }
        path.traverse(patternMatchVisitors(context));
        path.traverse(transformVisitors(context));
      }
    }
  };
}
