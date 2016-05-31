import * as ko from "knockout";
 

/**
 * Just some utilities/helpful function s
 */
export function RegisterView(name: string, file: string): void
{
  ko.components.register(name, {
    template: { require: 'text!views/' + file }
  });
}
