import path, { dirname } from 'path'
import fs from 'fs'

/**
 * Get the root directory containing all of the dictionary(json) files
 */
export function get_dictfiles_path(): string {
    // note: i have no idea why it's 4 levels up
    // const project_root = path.resolve(__dirname, '../../../../')
    const project_root = process.cwd()
    console.log('proj root: ', project_root)
    const dict_files = path.join(project_root, 'dictionary_files')
    return dict_files
}

/**
 * Get all the absolute file paths of each JSON file
 *
 * @param {string} root_path - root path of the dictionary(json) files
 * @returns {Promise<string[]>}
 */
export async function get_all_dictfiles_paths(root_path: string): Promise<string[]> {
    try {
        const paths = (await fs.promises.readdir(root_path)).map((path) => `${root_path}/${path}`)
        return paths
    } catch (err) {
        console.error(err)
        return []
    }
}

export async function get_consolidated_dict_data(paths: string[]): Promise<{}> {
    let consolidated_data = {}

    // https://stackoverflow.com/questions/71652497/node-how-to-async-await-folder-file-reads
    await Promise.all(
        paths.map(async (file) => {
            const data = JSON.parse(await fs.promises.readFile(file, 'utf8'))
            consolidated_data = { ...consolidated_data, ...data }
        }),
    )

    return consolidated_data
}

if (require.main === module) {
    ;(async function () {
        const dict_root_path = get_dictfiles_path()
        const all_file_paths = await get_all_dictfiles_paths(dict_root_path)
        const consolidated_dict_data = await get_consolidated_dict_data(all_file_paths)
        // console.log(consolidated_dict_data)
    })()
}
