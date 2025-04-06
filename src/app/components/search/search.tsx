"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type Gender = "girl" | "boy" | "other";
type Ethnicity = "caucasian" | "african" | "asian" | "hispanic" | "other";
type HairColor = "blonde" | "brunette" | "black" | "red" | "other";
type JobType =
  | "plumbing"
  | "electrical"
  | "cleaning"
  | "construction"
  | "design";

const SearchComponent = () => {
  // Fast Search State
  const [fastSearch, setFastSearch] = useState({
    city: "",
    nameType: "first" as "first" | "last" | "username",
  });

  // Advanced Search State
  const [advancedSearch, setAdvancedSearch] = useState({
    phone: "",
    name: "",
    city: "",
    isIndividual: false,
    isContractor: false,
    isVip: false,
    isVerified: false,
    gender: "" as Gender,
    ethnicity: "" as Ethnicity,
    hairColor: "" as HairColor,
    weight: { min: 40, max: 120 },
    height: { min: 150, max: 200 },
    workingHours: { from: 8, to: 20 },
    jobs: [] as JobType[],
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const cities = ["New York", "London", "Paris", "Tokyo", "Berlin"]; // Your city data

  const handleFastSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fast Search:", fastSearch);
    // API call for fast search
  };

  const handleAdvancedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Advanced Search:", advancedSearch);
    // API call for advanced search
  };

  const toggleJobSelection = (job: JobType) => {
    setAdvancedSearch((prev) => ({
      ...prev,
      jobs: prev.jobs.includes(job)
        ? prev.jobs.filter((j) => j !== job)
        : [...prev.jobs, job],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Fast Search */}
      <div className="bg-gradient-to-br from-pink-dark to-pink-dark2 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-white">Fast Search</h2>
        <form onSubmit={handleFastSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-1">
                City
              </label>
              <select
                value={fastSearch.city}
                onChange={(e) =>
                  setFastSearch({ ...fastSearch, city: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-1">
                Name Type
              </label>
              <select
                value={fastSearch.nameType}
                onChange={(e) =>
                  setFastSearch({
                    ...fastSearch,
                    nameType: e.target.value as never,
                  })
                }
                className="w-full p-2 border border-none select-none rounded-md"
              >
                <option value="first">First Name</option>
                <option value="last">Last Name</option>
                <option value="username">Username</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <SearchIcon className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Advanced Search Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center text-blue-600 mb-4"
      >
        {showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {showAdvanced ? "Hide Advanced Search" : "Show Advanced Search"}
      </button>

      {/* Advanced Search */}
      {showAdvanced && (
        <div className="bg-gradient-to-br from-pink-dark to-pink-dark2 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Advanced Search
          </h2>
          <form onSubmit={handleAdvancedSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Basic Information</h3>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={advancedSearch.phone}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-2 border-2 border-gray-300 select-none rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={advancedSearch.name}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    value={advancedSearch.city}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={advancedSearch.isIndividual}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          isIndividual: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    Individual
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={advancedSearch.isContractor}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          isContractor: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    Contractor
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={advancedSearch.isVip}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          isVip: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    VIP
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={advancedSearch.isVerified}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          isVerified: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    100% Verified
                  </label>
                </div>
              </div>

              {/* Personal Attributes */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">
                  Personal Attributes
                </h3>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={advancedSearch.gender}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        gender: e.target.value as Gender,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="girl">Girl</option>
                    <option value="boy">Boy</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Ethnicity
                  </label>
                  <select
                    value={advancedSearch.ethnicity}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        ethnicity: e.target.value as Ethnicity,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Ethnicity</option>
                    <option value="caucasian">Caucasian</option>
                    <option value="african">African</option>
                    <option value="asian">Asian</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Hair Color
                  </label>
                  <select
                    value={advancedSearch.hairColor}
                    onChange={(e) =>
                      setAdvancedSearch({
                        ...advancedSearch,
                        hairColor: e.target.value as HairColor,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Hair Color</option>
                    <option value="blonde">Blonde</option>
                    <option value="brunette">Brunette</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Physical Characteristics */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">
                  Physical Characteristics
                </h3>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Weight: {advancedSearch.weight.min}kg -{" "}
                    {advancedSearch.weight.max}kg
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="40"
                      max="200"
                      value={advancedSearch.weight.min}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          weight: {
                            ...advancedSearch.weight,
                            min: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="40"
                      max="200"
                      value={advancedSearch.weight.max}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          weight: {
                            ...advancedSearch.weight,
                            max: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Height: {advancedSearch.height.min}cm -{" "}
                    {advancedSearch.height.max}cm
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="140"
                      max="220"
                      value={advancedSearch.height.min}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          height: {
                            ...advancedSearch.height,
                            min: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="140"
                      max="220"
                      value={advancedSearch.height.max}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          height: {
                            ...advancedSearch.height,
                            max: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Working Hours</h3>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    From: {advancedSearch.workingHours.from}:00 - To:{" "}
                    {advancedSearch.workingHours.to}:00
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={advancedSearch.workingHours.from}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          workingHours: {
                            ...advancedSearch.workingHours,
                            from: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={advancedSearch.workingHours.to}
                      onChange={(e) =>
                        setAdvancedSearch({
                          ...advancedSearch,
                          workingHours: {
                            ...advancedSearch.workingHours,
                            to: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Job Types */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Service</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "plumbing",
                      "electrical",
                      "cleaning",
                      "construction",
                      "design",
                    ] as JobType[]
                  ).map((job) => (
                    <label key={job} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={advancedSearch.jobs.includes(job)}
                        onChange={() => toggleJobSelection(job)}
                        className="mr-2"
                      />
                      {job.charAt(0).toUpperCase() + job.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <SearchIcon className="mr-2" />
                Advanced Search
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
