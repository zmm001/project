�}� r �   ~¤n'�p���a	��� ��_N��}꯱.���I�����K$C�U�~�$��NQ��e�P��Hŷ3hϱɻ��A�����q�x��`ow�Q��<��%X|9Zo"�7�Q����.�KO�d��{l�F���y���;�����HJL��L�=�a9(,X(����̱!gдIە�̡�Nx�`5:3O��E~^Es�w�F�e��iE�#z�I�9��3��)j�&;y �O%�}�#��[b�"8$J��D��� A3%�m)��7��ӕ<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�*��tt�M��9B�?�o �n�V�g��᨝%�x���Z��_t�L��=�W`) (W�T�)A�$�$E�oϱt����B�'���J&���O+�ƭ�z��/�'Z����;�nnu[2��E���:റ�����h�=Zddwn����?�b�-c���j���/���]�!����[���1y����Y���e�0�
L|�7h���DXv�ի���4�16�R+����D�Ya�m�T���D��x����Ҫ{�l[)-����}ȑ�Pbs��j�Xt�0��"oV;t6S1t�Q)S�w1����)�X�[h��l�R�.;�XB6��&Oh�1�97����ёf
:���{9�[Z;�������ȥ���J����j����t�����(H%L?����e�D� qi2�5�I;f��5��B���!y���/b&e�o�K��`�j81S<�d
�R�2��#h�����b1�C���Ts�Rȍj��U�֮x�|)>      bookModel.AddRange(result.Select(nb => new BookInfoViewModel()
                {
                    Author = nb.Author,
                    BookId = nb.ID,
                    BookImg = nb.CoverImage,
                    BookName = nb.Name,
                    ClickCount = nb.ClickCount,
                    Decription = nb.Description,
                    Url = nb.Href
                }));
            }
            return bookModel;
        }
    }
}