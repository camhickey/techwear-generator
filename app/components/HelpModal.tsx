import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export function HelpModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>How to use</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg space-y-4 bg-white p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-lg font-bold">How to use</DialogTitle>
            <p>Select a color from the color picker to your left (your currently selected color is displayed below). Click on either the hat, top, pants, or shoes with your currently selected color to change the appearance of the outfit.</p>
            <p>When the outfit meets your liking, click the "GET THIS OUTFIT" button to generate an outfit like the one you just made.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}