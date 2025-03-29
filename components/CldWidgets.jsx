'use client';

import { useState, useCallback, useMemo } from 'react';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'react-toastify';

// Shimmer effect
const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="5s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`;

const CldWidgets = ({ resource }) => {
  const { secure_url, public_id } = resource;

  // State for managing transformations
  const [selectedEffect, setSelectedEffect] = useState('');
  const [effectInput, setEffectInput] = useState('');
  const [replaceFrom, setReplaceFrom] = useState('');
  const [replaceTo, setReplaceTo] = useState('');
  const [recolorObject, setRecolorObject] = useState('');
  const [recolorColor, setRecolorColor] = useState('');
  const [blurValue, setBlurValue] = useState('');
  const [transformations, setTransformations] = useState({
    width: 500,
    height: 500,
    crop: 'fit',
  });
  const [appliedTransformations, setAppliedTransformations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Getting user information using clerk
  const { user } = useUser();

  const handleEffectChange = useCallback((e) => {
    const effect = e.target.value;
    setSelectedEffect(effect);
    setEffectInput('');
    setBlurValue('');
    setReplaceFrom('');
    setReplaceTo('');
    setRecolorObject('');
    setRecolorColor('');
  }, []);

  const applyTransformations = useCallback(() => {
    setLoading(true);
    let updatedTransformations = { ...transformations };
    let newAppliedTransformations = [...appliedTransformations];

    const effectActions = {
      remove: () => {
        if (effectInput) {
          updatedTransformations.remove = effectInput;
          newAppliedTransformations.push({ effect: 'remove', value: effectInput });
        }
      },
      removeBackground: () => {
        updatedTransformations.removeBackground = true;
        newAppliedTransformations.push({ effect: 'removeBackground' });
      },
      grayscale: () => {
        updatedTransformations.grayscale = true;
        newAppliedTransformations.push({ effect: 'grayscale' });
      },
      blur: () => {
        if (blurValue) {
          updatedTransformations.blur = blurValue;
          newAppliedTransformations.push({ effect: 'blur', value: blurValue });
        }
      },
      replace: () => {
        if (replaceFrom && replaceTo) {
          updatedTransformations.replace = { from: replaceFrom, to: replaceTo, preserveGeometry: true };
          newAppliedTransformations.push({ effect: 'replace', from: replaceFrom, to: replaceTo });
        }
      },
      fillBackground: () => {
        updatedTransformations.fillBackground = true;
        newAppliedTransformations.push({ effect: 'fillBackground' });
      },
      recolor: () => {
        if (recolorObject && recolorColor) {
          updatedTransformations.recolor = { prompt: recolorObject, to: recolorColor, multiple: false };
          newAppliedTransformations.push({ effect: 'recolor', object: recolorObject, color: recolorColor });
        }
      },
    };

    if (effectActions[selectedEffect]) {
      effectActions[selectedEffect]();
    } else if (selectedEffect) {
      updatedTransformations[selectedEffect] = true;
      newAppliedTransformations.push({ effect: selectedEffect });
    }

    setTransformations(updatedTransformations);
    setAppliedTransformations(newAppliedTransformations);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [selectedEffect, effectInput, blurValue, replaceFrom, replaceTo, recolorObject, recolorColor, transformations, appliedTransformations]);

  const removeTransformation = useCallback((effectToRemove) => {
    setTransformations((prev) => {
      const updated = { ...prev };
      delete updated[effectToRemove];
      return updated;
    });
    setAppliedTransformations((prev) => 
      prev.filter((transformation) => transformation.effect !== effectToRemove)
    );
  }, []);

  const getTransformedImageUrl = useCallback(() => {
    return getCldImageUrl({
      src: public_id,
      width: 500,
      height: 500,
      crop: transformations.crop,
      ...transformations,
    });
  }, [public_id, transformations]);

  const downloadImage = useCallback(async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image', error);
      toast.error('Failed to download image');
    }
  }, []);

  const saveImage = useCallback(async (url, filename) => {
    try {
      const response = await axios.post('/api/save-transformed-image', {
        url,
        title: filename,
        email: user?.primaryEmailAddress?.emailAddress,
      });

      if (response.status === 200) {
        toast.success('Transformed Image saved successfully!');
      } else {
        toast.error('Failed to save Transformed Image.');
      }
    } catch (error) {
      console.error('Error saving Transformed Image:', error);
      toast.error('Failed to save Transformed Image.');
    }
  }, [user]);

  const renderEffectInputs = useMemo(() => {
    switch (selectedEffect) {
      case 'replace':
        return (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              What to Replace:
              <input
                type="text"
                value={replaceFrom}
                onChange={(e) => setReplaceFrom(e.target.value)}
                placeholder="Enter object to replace"
                className="border p-2 rounded w-full mt-2"
              />
            </label>
            <label className="text-gray-700">
              Replace With:
              <input
                type="text"
                value={replaceTo}
                onChange={(e) => setReplaceTo(e.target.value)}
                placeholder="Enter replacement object"
                className="border p-2 rounded w-full mt-2"
              />
            </label>
          </div>
        );
      case 'recolor':
        return (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700">
              Object to Recolor:
              <input
                type="text"
                value={recolorObject}
                onChange={(e) => setRecolorObject(e.target.value)}
                placeholder="e.g., duck"
                className="border p-2 rounded w-full mt-2"
              />
            </label>
            <label className="text-gray-700">
              New Color:
              <input
                type="text"
                value={recolorColor}
                onChange={(e) => setRecolorColor(e.target.value)}
                placeholder="e.g., blue"
                className="border p-2 rounded w-full mt-2"
              />
            </label>
          </div>
        );
      case 'blur':
        return (
          <label className="text-gray-700">`
            Blur Amount:
            <input
              type="number"
              value={blurValue}
              onChange={(e) => setBlurValue(e.target.value)}
              placeholder="Enter blur value"
              className="border p-2 rounded w-full mt-2"
            />
          </label>
        );
      case 'remove':
        return (
          <label className="text-gray-700">
            Specify Object to Remove:
            <input
              type="text"
              value={effectInput}
              onChange={(e) => setEffectInput(e.target.value)}
              placeholder="e.g., apple"
              className="border p-2 rounded w-full mt-2"
            />
          </label>
        );
      default:
        return null;
    }
  }, [selectedEffect, replaceFrom, replaceTo, recolorObject, recolorColor, blurValue, effectInput]);

  return (
    <div className="flex flex-col items-center p-6 space-y-2">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-4 w-full max-w-3xl">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">Original Image</h2>
          <CldImage width={500} height={500} src={secure_url} alt={public_id} className='rounded' />
        </div>
        <div className="flex flex-col items-center space-y-2 relative">
          <h2 className="text-lg font-semibold text-gray-800">Transformed Image</h2>
          <div className="relative w-500 h-500">
            {loading && (
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-contain"
                style={{
                  backgroundImage: `url(${dataUrl})`,
                  backgroundSize: 'cover',
                  zIndex: 1,
                }}
              />
            )}
            <CldImage
              src={secure_url}
              alt={`${public_id}-transformed`}
              width={500}
              height={500}
              crop={transformations.crop}
              {...transformations}
              style={loading ? { visibility: 'hidden' } : {}}
              className='rounded'
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg">
        {appliedTransformations.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Applied Transformations</h3>
            <div className="flex flex-wrap gap-2">
              {appliedTransformations.map((transformation, index) => (
                <div
                  key={index}
                  className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full flex items-center"
                >
                  {transformation.effect}{' '}
                  <button
                    onClick={() => removeTransformation(transformation.effect)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${transformation.effect} effect`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Transformations</h3>
        <div className="flex flex-col gap-4">
          <label className="text-gray-700">
            Crop Mode:
            <select
              name="crop"
              value={transformations.crop}
              onChange={(e) => setTransformations({ ...transformations, crop: e.target.value })}
              className="border p-2 rounded w-full mt-2"
            >
              <option value="scale">Scale</option>
              <option value="fit">Fit</option>
              <option value="fill">Fill</option>
              <option value="crop">Crop</option>
            </select>
          </label>

          <label className="text-gray-700">
            Effect:
            <select
              value={selectedEffect}
              onChange={handleEffectChange}
              className="border p-2 rounded w-full mt-2"
            >
              <option value="">Select an Effect</option>
              <option value="blur">Blur</option>
              <option value="improve">Improve</option>
              <option value="restore">Restore</option>
              <option value="removeBackground">Remove Background</option>
              <option value="grayscale">Grayscale</option>
              <option value="remove">Remove Object</option>
              <option value="replace">Replace Object</option>
              <option value="fillBackground">Fill Background</option>
              <option value="recolor">Recolor</option>
            </select>
          </label>

          {renderEffectInputs}
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <button
            onClick={applyTransformations}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Apply Transformations
          </button>

          <button
            onClick={() => {
              const transformedImageUrl = getTransformedImageUrl();
              downloadImage(transformedImageUrl, `${public_id}-transformed.png`);
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Download Image
          </button>

          <button
            onClick={() => {
              const transformedImageUrl = getTransformedImageUrl();
              saveImage(transformedImageUrl, `${public_id}-transformed.png`);
            }}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-600 transition duration-200"
          >
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default CldWidgets;

